import nookies from "nookies";

export enum CookieKeys {
    FIREBASE_TOKEN = "FIREBASE_TOKEN",
}

export const firebaseTokenCookie = {
    set(token: string) {
        nookies.set(null, CookieKeys.FIREBASE_TOKEN, token);
    },
    destroy() {
        nookies.destroy(null, CookieKeys.FIREBASE_TOKEN);
    },
};
