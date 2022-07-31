import { ClassConstructor, plainToInstance } from "class-transformer";
import { FirestoreDataConverter } from "firebase/firestore";

/**
 * This converter cannot convert DocumentReference nor CollectionReference.
 */
const createBasicConverter = <T extends Record<string, unknown>>(cls: ClassConstructor<T>) => {
	const converter: FirestoreDataConverter<T> = {
		fromFirestore(snapshot, options?) {
			const data = snapshot.data(options);

			return plainToInstance(cls, data);
		},
		toFirestore(modelObject) {
			return { ...modelObject };
		}
	};

	return converter;
};

export default createBasicConverter;
