import { customAlphabet } from "nanoid";

export const randomNumeric = (length: number) => customAlphabet("0123456789")(length);

export const randomAlphaNumeric = (length: number) => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")(length);

export function generateUniqueId(prefix?: string | undefined | null, suffix?: string | undefined | null) {
    let result = randomNumeric(4) + randomAlphaNumeric(9);
    if (prefix) result = `${prefix}${result}`;
    if (suffix) result = `${result}${suffix}`;
    return result;
}
