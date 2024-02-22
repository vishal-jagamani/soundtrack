import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { config } from '../../../config/config.js';
import { generateNewAccessToken, generateNewRefreshToken } from '../../utils/jwt.js';
import { findLastDocument, findOne, findOneAndUpdate, insertOne, updateOne } from '../mongodbService.js';

// Function which checks email to verify whether user is registered already or not
const checkUserEmail = async (details) => {
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
const addNewUserInDB = async (email) => {
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
const sendEmailWithOTP = async (email, otp) => {
    try {
        const emailBody = config?.Email_Config?.OTP_Verification_Email_Body?.replace('[otp]', otp);
        const sendEmail = await sendEmailWithNodeMailer(email, emailBody);
        return { status: true, emailSent: sendEmail && sendEmail?.status };
    } catch (err) {
        console.log('Error in authService.checkUserEmail service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Function which sends the email to user
const sendEmailWithNodeMailer = async (email, emailBody) => {
    try {
        const transporter = nodemailer?.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config?.Email_Config?.Support_Email_Address,
                pass: config?.Email_Config?.Support_Email_Address_Password,
            },
        });
        const mailOptions = {
            from: config?.Email_Config?.Support_Email_Address,
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
const verifyOTP = async (userId, otp) => {
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
const resendOTP = async (userId) => {
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
            const emailBody = config?.Email_Config?.OTP_Verification_Email_Body?.replace('[otp]', newOTP);
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
const userSignupDetails = async (req, res) => {
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
            const accessTokenExpiryTime = Math.floor(Date.now() / 1000) + config?.Access_Token_Expiry_Time;
            const refreshTokenExpiresIn = Math.floor(Date.now() / 1000) + config?.Refresh_Token_Expiry_Time;
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
            res?.setHeader('Authorization', `Bearer ${accessToken?.accessToken}`);
            res?.setHeader('X-Refresh-Token', refreshToken?.refreshToken);
            res?.setHeader('X-Access-Token-Expiry', accessTokenExpiryTime);
            res?.setHeader('X-Refresh-Token-Expiry', refreshTokenExpiresIn);
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
const userLogin = async (req, res) => {
    try {
        const { userId, email, password } = req?.body;
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
                            name: userData?.name || null,
                            email: userData?.email || null,
                            isLoggedIn: true,
                            createdAt: Math.floor(Date.now() / 1000),
                            expiryTime: Math.floor(Date.now() / 1000) + 3600,
                        };
                        const accessToken = await generateNewAccessToken(tokenData);
                        const refreshToken = await generateNewRefreshToken(tokenData);
                        res.setHeader('Authorization', `Bearer ${accessToken?.accessToken}`);
                        res.setHeader('X-Refresh-Token', refreshToken?.refreshToken);
                        res.setHeader('X-Access-Token-Expiry', accessTokenExpiryTime);
                        res.setHeader('X-Refresh-Token-Expiry', refreshTokenExpiresIn);
                        return res?.status(200)?.send({ status: true, message: 'Login successfull' });
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

export { addNewUserInDB, checkUserEmail, resendOTP, sendEmailWithNodeMailer, sendEmailWithOTP, userLogin, userSignupDetails, verifyOTP };
