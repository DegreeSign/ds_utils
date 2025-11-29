import { SetupData } from "../types";

const
    // ID shuffle 🔀
    idShuffle = async ({
        data,
        password,
    }: SetupData) => {
        return password?.length == 4 ? pinShuffle({ data, password })
            : await encryptText({ data, password });
    },
    alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "@", ".", "_", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    pinShuffle = ({
        data,
        password,
    }: SetupData): string => {
        try {
            const codeSh = (char: string, pin: number) =>
                alpha.includes(char.toLowerCase()) ?
                    alpha[(alpha.indexOf(char.toLowerCase()) + Math.pow(pin, 3)) % alpha.length]
                    : char;
            return [...data].map(char => codeSh(char, Number(password))).join(``);
        } catch { return `` };
    },
    encryptText = async ({
        data,
        password,
    }: SetupData): Promise<string> => {
        if (!data || !password) return ``;
        try {

            // check crypto
            crypto.subtle

            const
                enc = new TextEncoder(),
                encData = enc.encode(data),
                passBytes = enc.encode(password),

                hash = await crypto.subtle.digest("SHA-256", passBytes),
                hashArray = new Uint8Array(hash),
                keyData = hashArray.slice(0, 32), // 256-bit key
                iv = hashArray.slice(0, 12), // 96-bit IV
                key = await crypto.subtle.importKey(
                    "raw",
                    keyData,
                    { name: "AES-GCM" },
                    false,
                    ["encrypt"]
                ),
                encrypted = await crypto.subtle.encrypt(
                    { name: "AES-GCM", iv },
                    key,
                    encData
                );

            return btoa(String.fromCharCode(...new Uint8Array(encrypted)))
                .replace(/\+/g, "a")
                .replace(/\//g, "b")
                .replace(/=/g, "c")
                .toLowerCase();

        } catch { return `` };
    },
    /** max 32 characters */
    idRandShort = (length = 10) => {
        try {
            return crypto.randomUUID()
                ?.replaceAll(`-`, ``)
                ?.slice(0, length);
        } catch (e) {
            console.log(`idRandShort failed`, e);
            return ``
        };
    },
    /** random id any length */
    idRandLong = (length = 10) => {
        try {
            const
                letters = 'abcdefghijklmnopqrstuvwxyz',
                array = new Uint8Array(length);
            crypto.getRandomValues(array);
            return Array.from(array).map(n => letters[n % 26]).join('');
        } catch (e) {
            console.log(`idRandLong failed`, e);
            return '';
        };
    };

export {
    idShuffle,
    idRandShort,
    idRandLong,
}
