import {
    assertSucceeds,
    RulesTestContext,
    RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import {
    CollectionReference,
    DocumentReference,
    Firestore,
    where
} from "firebase/firestore";
import {
    cleanMockFirebase,
    mockDb,
    setupMockFirebase
} from "../../../tests/utils/firebase-tests-utils";
import createBasicConverter from "../../../utils/firebase/client/firestore/create-basic-converter";
import { BookCollection, BookDoc } from "./mock-data";

/*

I should test these for each model that I make but since I don't really have time
testing the base should be good enough.

*/

/* Mock firestore */
interface MockUser {
    user: RulesTestContext;
    db: Firestore;
    collection: BookCollection;
}

let rulesTestEnv: RulesTestEnvironment;
let authUser: MockUser;

beforeEach(async () => {
    const mockFirebase = await setupMockFirebase();
    const converter = createBasicConverter(BookDoc);

    rulesTestEnv = mockFirebase.testEnv;
    authUser = {
        user: mockFirebase.authUser,
        db: mockDb(mockFirebase.authUser),
        collection: new BookCollection(converter, mockDb(mockFirebase.authUser))
    };
});

afterEach(async () => await cleanMockFirebase(rulesTestEnv));

describe("Base collection fields", () => {
    it("exposes its CollectionReference", () => {
        expect(authUser.collection.ref).toBeInstanceOf(CollectionReference);
    });
});

describe("Base collection methods", () => {
    it("adds a document", async () => {
        await assertSucceeds(
            authUser.collection.add(new BookDoc("One book", "Oner", 2981))
        );
    });
    it("adds multiple documents", async () => {
        await assertSucceeds(
            authUser.collection.add(
                new BookDoc("One book", "Oner", 2981),
                new BookDoc("Two book", "Oner", 2981),
                new BookDoc("Three book", "Oner", 2981)
            )
        );
    });

    it("returns a DocumentReference when adding ONE document", async () => {
        const doc = new BookDoc("b1", "a1", 1999);

        const ref: DocumentReference<BookDoc> = await authUser.collection.add(doc);

        expect(ref).toBeInstanceOf(DocumentReference);
    });
    it("returns an array of DocumentReference when adding MULTIPLE documents", async () => {
        const docs = [
            new BookDoc("One book", "Oner", 2981),
            new BookDoc("Two book", "Oner", 2981),
            new BookDoc("Three book", "Oner", 2981)
        ];

        const refs: DocumentReference<BookDoc>[] = await authUser.collection.add(
            ...docs
        );

        refs.forEach(ref => expect(ref).toBeInstanceOf(DocumentReference));
    });

    it("gets a doc by id", async () => {
        const book = new BookDoc("One book", "Oner", 2981);

        const docRef: DocumentReference<BookDoc> = await authUser.collection.add(
            book
        );

        const doc = await authUser.collection.getDocById(docRef.id);

        expect(doc.data()).toEqual(book);
    });
    it("lists all of its documents", async () => {
        const books = [
            new BookDoc("One book", "Oner", 2981),
            new BookDoc("Two book", "Oner", 2981),
            new BookDoc("Three book", "Oner", 2981)
        ];

        await authUser.collection.add(...books);

        const bookDocs = await authUser.collection.docs();

        expect(
            bookDocs.docs.every(
                doc => !!books.find(book => book.title === doc.get("title"))
            )
        ).toBe(true);
    });
    it("queries starting from its CollectionReference", async () => {
        const books = [
            new BookDoc("One book", "Oner", 1999),
            new BookDoc("Two book", "Oner", 1985),
            new BookDoc("Three book", "Oner", 2050),
            new BookDoc("Four book", "Oner", 2010)
        ];

        await authUser.collection.add(...books);

        const bookDocs = await authUser.collection.queryFrom(
            where("year", "<=", 1999)
        );

        expect(bookDocs.docs).toHaveLength(2);
    });

    it("updates a doc by id", async () => {
        const { collection } = authUser;

        const book = new BookDoc("The hungry gamers", "Dunno", 2010);

        const { id } = await collection.add(book);

        await collection.updateDocById(id, {
            author: "Danno"
        });

        const bookAfterUpdate = await collection.getDocById(id);

        expect(bookAfterUpdate.data()).toHaveProperty("author", "Danno");
        expect(bookAfterUpdate.data()).not.toEqual(book);
    });

    it("deletes a doc by id", async () => {
        const { collection } = authUser;

        const book = new BookDoc("The hungry gamers", "Dunno", 2010);

        const { id } = await collection.add(book);

        const bookInDb = await collection.getDocById(id);

        expect(bookInDb.data()).toEqual(book);

        await collection.deleteDocById(id);

        expect((await collection.getDocById(id)).exists()).toBe(false);
    });
    it("clears all of its documents", async () => {
        const { collection } = authUser;

        const books = [
            new BookDoc("One book", "Oner", 1999),
            new BookDoc("Two book", "Oner", 1985),
            new BookDoc("Three book", "Oner", 2050),
            new BookDoc("Four book", "Oner", 2010)
        ];

        await collection.add(...books);

        const booksInDbBeforeClear = (await collection.docs()).docs;

        await collection.clear();

        const booksInDbAfterClear = (await collection.docs()).docs;

        expect(booksInDbBeforeClear).toHaveLength(books.length);
        expect(booksInDbAfterClear).toHaveLength(0);
    });
});
