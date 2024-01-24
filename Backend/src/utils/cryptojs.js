import { AES, enc } from 'crypto-js';
import { Secrets } from '../../config/config';

export const encryptData = (rawData) => {
    const encryptedData = AES?.encrypt(JSON.stringify(rawData), Secrets?.CRYPTOJS_SECRET)?.toString();
    return encryptedData;
};

export const decryptData = (encryptedData) => {
    const decryptedData = AES?.decrypt(encryptedData, Secrets?.CRYPTOJS_SECRET)?.toString(enc?.Utf8);
    return decryptedData;
};
