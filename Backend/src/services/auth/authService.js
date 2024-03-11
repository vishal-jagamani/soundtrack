import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { Config, Secrets } from '../../../config/config.js';
import { generateNewAccessToken, generateNewRefreshToken, refreshAccessTokenFromRefreshToken, validateAccessToken } from '../../utils/jwt.js';
import { findLastDocument, findOne, findOneAndUpdate, insertOne, updateOne } from '../mongodbService.js';
import CryptoJS from 'crypto-js';

// Function to check user details from ux to handle anonymous or logged in user
export const checkUserDetails = async (req, res) => {
    try {
        const accessToken = req?.headers?.authorization?.split?.(' ')?.[1];
        const refreshToken = req?.headers?.['x-refresh-token'];
        if (accessToken && refreshToken) {
            // Logged in user
            const validateToken = await validateAccessToken(accessToken);
            if (validateToken && validateToken?.status) {
                res?.set(req?.headers);
                // const exposedHeaders = Object.keys(headers).join(', ');
                const exposedHeaders = [
                    'authorization',
                    'x-refresh-token',
                    'x-access-token-expiry',
                    'x-refresh-token-expiry',
                    'x-anonymous-user',
                ]?.join(', ');
                res?.setHeader('x-anonymous-user', false);
                res?.set('Access-Control-Expose-Headers', exposedHeaders);
                const encryptedUserDetails = CryptoJS?.AES?.encrypt(
                    JSON.stringify(validateToken?.validateResult),
                    Secrets?.CRYPTOJS_SECRET,
                )?.toString();
                return res?.status(200)?.send({ status: true, message: 'Logged in user', data: encryptedUserDetails });
            } else {
                if (validateToken && validateToken?.error == 'Expired') {
                    const refreshedToken = await refreshAccessTokenFromRefreshToken(refreshToken);
                    if (refreshedToken && refreshedToken?.status) {
                        // Set X-Token-Refreshed header in the response
                        res.setHeader('x-token-refreshed', true);
                        req.headers.authorization = `Bearer ${refreshedToken?.accessToken}`;
                        res?.set(req?.headers);
                        const exposedHeaders = [
                            'authorization',
                            'x-refresh-token',
                            'x-access-token-expiry',
                            'x-refresh-token-expiry',
                            'x-anonymous-user',
                        ]?.join();
                        res?.setHeader('x-anonymous-user', false);
                        res?.set('Access-Control-Expose-Headers', exposedHeaders);
                        const tokenData = await validateAccessToken(refreshedToken?.accessToken);
                        const encryptedUserDetails = CryptoJS?.AES?.encrypt(
                            JSON.stringify(tokenData?.validateResult),
                            Secrets?.CRYPTOJS_SECRET,
                        )?.toString();
                        return res.status(200).send({ status: true, message: 'Logged in user', data: encryptedUserDetails });
                    } else {
                        return await getAnonymousUserData(req, res);
                    }
                } else {
                    return await getAnonymousUserData(req, res);
                }
            }
        } else {
            // Anonymous user
            const anonymousUserData = await getAnonymousUserData(req, res);
            return anonymousUserData;
        }
    } catch (err) {
        console.log('Error in authService.checkUserDetails service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Function which creates the access token data for anonymous user
export const getAnonymousUserData = async (req, res) => {
    try {
        const accessTokenExpiryTime = Math.floor(Date.now() / 1000) + Config?.Access_Token_Expiry_Time;
        const refreshTokenExpiryTime = Math.floor(Date.now() / 1000) + Config?.Refresh_Token_Expiry_Time;
        const userId = crypto.randomUUID();
        const anonymousUserData = {
            userId,
            isAnonymous: true,
            isLoggedIn: false,
            createdAt: Math.floor(Date.now() / 1000),
            expiryTime: accessTokenExpiryTime,
        };
        const accessToken = await generateNewAccessToken(anonymousUserData);
        const refreshToken = await generateNewRefreshToken(anonymousUserData);
        const headers = {
            authorization: `Bearer ${accessToken?.accessToken}`,
            'x-refresh-token': refreshToken?.refreshToken,
            'x-access-token-expiry': accessTokenExpiryTime,
            'x-refresh-token-expiry': refreshTokenExpiryTime,
            'x-anonymous-user': true,
        };
        res?.set(headers);
        const exposedHeaders = Object.keys(headers).join(', ');
        res?.set('Access-Control-Expose-Headers', exposedHeaders);
        return res?.status(200)?.send({ status: true, message: 'Anonymous user', data: anonymousUserData });
    } catch (err) {
        console.log('Error in authService.getAnonymousUserData service', err);
        throw err;
    }
};

// Function which checks email to verify whether user is registered already or not
export const checkUserEmail = async (details) => {
    try {
        const { email } = details;
        const user = await findOne('User', { email });
        if (user) {
            // User email exist
            if (user?.otpVerified == true) {
                const data = { userId: user?.userId, userExist: true, email: user?.email, otpVerified: user?.otpVerified };
                return { status: true, message: 'Existing user', data };
            } else {
                const resendEmail = await resendOTP(user?.userId);
                const data = {
                    userId: user?.userId,
                    userExist: true,
                    email,
                    otpVerificationMailSent: resendEmail && resendEmail?.status ? true : false,
                    otpVerified: false,
                };
                return { status: true, message: 'Existing user', data };
            }
        } else {
            // User email doesn't exist
            const newUser = await addNewUserInDB(email);
            const sendEmail = await sendEmailWithOTP(email, newUser?.otp);
            const data = {
                userId: newUser?.userId,
                userExist: false,
                email,
                otpVerificationMailSent: sendEmail && sendEmail?.status ? true : false,
                otpVerified: false,
            };
            return { status: true, message: 'New user', data };
        }
    } catch (err) {
        console.log('Error in authService.checkUserEmail service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Added by Vishal Jagamani, to add new user in db
export const addNewUserInDB = async (email) => {
    try {
        const lastDocument = await findLastDocument('User');
        const id = lastDocument && lastDocument?.length ? (lastDocument[0]._id += 1) : 1;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const document = {
            _id: id,
            userId: id,
            email,
            otp,
            otpVerified: false,
            otpTimestamp: Math.floor(Date.now() / 1000),
            createdAt: Math.floor(Date.now() / 1000),
            modifiedAt: Math.floor(Date.now() / 1000),
        };
        const addUserWithOTP = await insertOne('User', document);
        return { status: true, userId: addUserWithOTP?.insertedId, otp };
    } catch (err) {
        console.log('Error in authService.checkUserEmail service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Function which send email with otp to user
export const sendEmailWithOTP = async (email, otp) => {
    try {
        const emailBody = Config?.Email_Config?.OTP_Verification_Email_Body?.replace('[otp]', otp);
        const sendEmail = await sendEmailWithNodeMailer(email, emailBody);
        return { status: true, emailSent: sendEmail && sendEmail?.status };
    } catch (err) {
        console.log('Error in authService.checkUserEmail service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Function which sends the email to user
export const sendEmailWithNodeMailer = async (email, emailBody) => {
    try {
        const transporter = nodemailer?.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: Config?.Email_Config?.Support_Email_Address,
                pass: Config?.Email_Config?.Support_Email_Address_Password,
            },
        });
        const mailOptions = {
            from: Config?.Email_Config?.Support_Email_Address,
            to: email,
            subject: 'OTP Verification',
            html: emailBody,
        };
        const sendEmail = await transporter.sendMail(mailOptions);
        return { status: true, message: 'OTP verification email sent to user' };
    } catch (err) {
        console.log('Error in authService.sendEmailWithNodeMailer service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Function to verify the otp entered by the user
export const verifyOTP = async (userId, otp) => {
    try {
        const document = await findOne('User', { userId });
        if (document) {
            // Check if the OTP is correct
            if (parseInt(otp) === document?.otp) {
                // Check if the OTP is still valid (within 3 minutes)
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (currentTimestamp - document?.otpTimestamp <= 180) {
                    // OTP valid
                    const updateOTPVerifiedStatus = await updateOne('User', { $set: { otpVerified: true } }, { userId });
                    return { status: true, message: 'Valid OTP' };
                } else {
                    // OTP expired
                    return { status: false, message: 'OTP has expired' };
                }
            } else {
                return { status: false, message: 'Invalid OTP' };
            }
        } else {
            return { status: false, message: 'User not exist' };
        }
    } catch (err) {
        console.log('Error in authService.verifyOTP service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Function to resend the otp for user
export const resendOTP = async (userId) => {
    try {
        const userDetails = await findOne('User', { userId: parseInt(userId) });
        if (userDetails) {
            const newOTP = Math.floor(100000 + Math.random() * 900000);
            const updateQuery = {
                $set: {
                    otp: newOTP,
                    otpTimestamp: Math.floor(Date.now() / 1000),
                },
            };
            await findOneAndUpdate('User', { userId: parseInt(userId) }, updateQuery);
            const emailBody = Config?.Email_Config?.OTP_Verification_Email_Body?.replace('[otp]', newOTP);
            const sendEmail = await sendEmailWithNodeMailer(userDetails?.email, emailBody);
            if (sendEmail && sendEmail?.status) {
                return { status: true, message: 'Resend otp mail sent' };
            } else {
                return { status: false, message: 'Resend otp mail not sent' };
            }
        } else {
            return { status: false, message: 'User not found' };
        }
    } catch (err) {
        console.log('Error in authService.verifyOTP service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Function which accepts the details of user with password and registers user in the app
export const userSignupDetails = async (req, res) => {
    try {
        const { userId, firstName, lastName, password } = req?.body;
        const encryptedPassword = await bcrypt?.hash(password, 10);
        const updateQuery = {
            $set: {
                firstName: firstName,
                lastName: lastName,
                password: encryptedPassword,
                modifiedAt: Math.floor(Date.now() / 1000),
            },
        };
        const updateUserDetails = await findOneAndUpdate('User', { userId }, updateQuery);
        if (updateUserDetails && updateUserDetails) {
            const accessTokenExpiryTime = Math.floor(Date.now() / 1000) + Config?.Access_Token_Expiry_Time;
            const refreshTokenExpiresIn = Math.floor(Date.now() / 1000) + Config?.Refresh_Token_Expiry_Time;
            const tokenData = {
                userId,
                firstName: firstName,
                lastName: lastName,
                email: updateUserDetails?.email || null,
                isLoggedIn: true,
                createdAt: Math.floor(Date.now() / 1000),
                expiryTime: accessTokenExpiryTime,
            };
            const accessToken = await generateNewAccessToken(tokenData);
            const refreshToken = await generateNewRefreshToken(tokenData);
            const headers = {
                authorization: `Bearer ${accessToken?.accessToken}`,
                'x-refresh-token': refreshToken?.refreshToken,
                'x-access-token-expiry': accessTokenExpiryTime,
                'x-refresh-token-expiry': refreshTokenExpiresIn,
            };
            res?.set(headers);
            const exposedHeaders = Object.keys(headers).join(', ');
            res?.set('Access-Control-Expose-Headers', exposedHeaders);
            return res?.status(200)?.send({ status: true, message: 'User details registered successfully' });
        } else {
            return res?.status(200)?.send({ status: false, message: 'User details not registered' });
        }
    } catch (err) {
        console.log('Error in authService.userSignup service', err);
        return res?.status(500)?.send({ status: false, message: 'Error in service' });
    }
};

// Function which logins the user in the app
export const userLogin = async (req, res) => {
    try {
        const { userId, firstName, lastName, email, password } = req?.body;
        const userData = await findOne('User', { email });
        if (userData) {
            bcrypt?.compare(password, userData?.password, async (err, result) => {
                if (err) {
                    console.log('Error comparing password in authService.userLogin service', err);
                    return res?.status(500)?.send({ status: false, message: 'Error in service' });
                } else {
                    if (result) {
                        const accessTokenExpiryTime = Math.floor(Date.now() / 1000) + 3600;
                        const refreshTokenExpiresIn = Math.floor(Date.now() / 1000) + 604800;
                        const tokenData = {
                            userId,
                            firstName: userData?.firstName,
                            lastName: userData?.lastName,
                            email: userData?.email || null,
                            isLoggedIn: true,
                            createdAt: Math.floor(Date.now() / 1000),
                            expiryTime: Math.floor(Date.now() / 1000) + 3600,
                        };
                        const accessToken = await generateNewAccessToken(tokenData);
                        const refreshToken = await generateNewRefreshToken(tokenData);
                        const headers = {
                            authorization: `Bearer ${accessToken?.accessToken}`,
                            'x-refresh-token': refreshToken?.refreshToken,
                            'x-access-token-expiry': accessTokenExpiryTime,
                            'x-refresh-token-expiry': refreshTokenExpiresIn,
                        };
                        res?.set(headers);
                        const exposedHeaders = Object.keys(headers).join(', ');
                        res?.set('Access-Control-Expose-Headers', exposedHeaders);
                        const encryptedUserDetails = CryptoJS?.AES?.encrypt(JSON.stringify(tokenData), Secrets?.CRYPTOJS_SECRET)?.toString();
                        return res?.status(200)?.send({ status: true, message: 'Login successful', data: encryptedUserDetails });
                    } else {
                        return res?.status(200)?.send({ status: false, message: 'Wrong password' });
                    }
                }
            });
        } else {
            return res?.status(200)?.send({ status: false, message: 'User not found' });
        }
    } catch (err) {
        console.log('Error in authService.userLogin service', err);
        return res?.status(500)?.send({ status: false, message: 'Error in service' });
    }
};
