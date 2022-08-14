import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Input,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import {
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { type NextPage } from "next";
import {
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
    useMemo,
    useState,
} from "react";
import VisugoLogo from "../components/VisugoLogo";
import { UserCollection, UserDoc, userDocConverter } from "../models/user/user";
import { validatePassword } from "../utils/auth";
import { firebaseTokenCookie } from "../utils/cookies";
import getFirestoreClient from "../utils/firebase/client/firestore/get-firestore-client";
import getFirebaseClient from "../utils/firebase/client/get-firebase-client";

const Auth: NextPage = () => {
    const bg = useColorModeValue("white", "black");

    const app = useMemo(() => getFirebaseClient(), []);
    const auth = useMemo(() => getAuth(app), [app]);
    const db = useMemo(() => getFirestoreClient(app), [app]);
    const provider = useMemo(() => new GoogleAuthProvider(), []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState<string>("");
    const [passError, setPassError] = useState<string>("");

    const emailInputHandler: ChangeEventHandler<HTMLInputElement> = ({
        target: { value },
    }) => {
        setEmail(value);

        setEmailError("");
    };

    const passwordInputHandler: ChangeEventHandler<HTMLInputElement> = ({
        target: { value },
    }) => {
        setPassword(value);

        try {
            if (validatePassword(value)) {
                setPassError("");
            }
        } catch (err) {
            if (err instanceof Error) {
                setPassError(err.message);
            }
        }
    };

    const signup: MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case AuthErrorCodes.EMAIL_EXISTS:
                        setEmailError("Email already exists!");
                        break;

                    case AuthErrorCodes.WEAK_PASSWORD:
                        setPassError(err.message);
                        break;
                }
            }
        }
    };

    const login: MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case "auth/user-not-found":
                        setEmailError("User doesn't exist");
                }
            }
        }
    };

    const googleAuth = async () => await signInWithPopup(auth, provider);

    const isCredentialsInvalid = !email || !password || !!emailError || !!passError;

    useEffect(
        () =>
            onIdTokenChanged(auth, async user => {
                const userCol = new UserCollection(userDocConverter, db);

                if (user) {
                    userCol.signUp(user.uid, new UserDoc(user.uid));

                    firebaseTokenCookie.set(await user.getIdToken());
                } else {
                    firebaseTokenCookie.destroy();
                }
            }),
        [auth, db]
    );

    return (
        <Center
            bg={bg}
            w="100vw"
        >
            <VStack
                h="100vh"
                justify="center"
                maxW="32em"
                minH="70em"
                px="4"
                py="8"
                spacing="20"
            >
                <VisugoLogo />

                <VStack
                    spacing={6}
                    as="form"
                >
                    <FormControl
                        isRequired
                        isInvalid={!!emailError}
                    >
                        <FormLabel>Enter your Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={emailInputHandler}
                        />
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                        isRequired
                        isInvalid={!!passError}
                    >
                        <FormLabel>Enter your Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={passwordInputHandler}
                        />
                        <FormErrorMessage>{passError}</FormErrorMessage>
                    </FormControl>
                </VStack>

                <Grid
                    templateColumns="repeat(6, 1fr)"
                    w="full"
                    gap="4"
                >
                    <GridItem colSpan={3}>
                        <Button
                            w="full"
                            onClick={signup}
                            isDisabled={isCredentialsInvalid}
                        >
                            Sign Up
                        </Button>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Button
                            w="full"
                            onClick={login}
                            isDisabled={isCredentialsInvalid}
                        >
                            Login
                        </Button>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <Button
                            onClick={googleAuth}
                            w="full"
                            bg="#4285F4"
                        >
                            Continue with Google
                        </Button>
                    </GridItem>
                </Grid>
            </VStack>
        </Center>
    );
};

export default Auth;
