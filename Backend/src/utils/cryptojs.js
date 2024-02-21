import CryptoJS from 'crypto-js';
import { Secrets } from '../../config/config.js';

export const encryptData = (rawData) => {
    const encryptedData = CryptoJS?.AES?.encrypt(JSON.stringify(rawData), Secrets?.CRYPTOJS_SECRET)?.toString();
    return encryptedData;
};

export const decryptData = (encryptedData) => {
    const decryptedData = CryptoJS?.AES?.decrypt(encryptedData, Secrets?.CRYPTOJS_SECRET)?.toString(CryptoJS?.enc?.Utf8);
    return decryptedData;
};
