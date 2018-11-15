"use strict";

const Users = require("./users.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecretKey = "meowmeow"; //should be RS256 in production

async function registerUser(req, res) {
    try {
        const {email, pw} = verifyParams(req.body);
        const isEmailAvail = await emailAvailable(email);
        const pwHash = await hashPW(pw);
        const { _id } = await createUser({ email, pw, pwHash });
        const encodedJWT = await encodeJWT(_id);
        return res.status(200).json({ jwt: encodedJWT });
    } catch (err) {
        console.log("Registration error", err);
        const { statusCode, msg } = err;
        if(statusCode) return res.status(statusCode).json({ statusCode, msg });
        return res.status(500).json({ statusCode: 500, msg: "Internal Error" });
    }
}

function verifyParams(userData) {
    // TODO: Verify email format, trim whitespace
    const { email, password: pw } = userData;
    if (!email) throw { statusCode: 406, msg: "Invalid email format"};
    else if (email === "" || pw === "") throw { statusCode: 406, msg: "Email/password cannot be empty" };
    else return { email, pw };
}

function emailAvailable(email) {
    return new Promise((resolve, reject) => {
        Users.findOne({ email }, (err, data) => {
            if (err) reject(err);
            else if (data === null) resolve(true);
            else reject({ statusCode: 400, msg: "Email exists" });
        });
    });
}

function hashPW(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 11, (err, hash) => {
            if (err) reject(err);
            else resolve(hash);
        });
    });
}

function createUser(regData) {
    return new Promise((resolve, reject) => {
        Users.create(regData, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function encodeJWT(uId) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { uId },
            jwtSecretKey,
            { algorithm: "HS256", expiresIn: "12h" }, // use RS256 in production
            (err, token) => {
                if (err) reject(err);
                else resolve(token);
            }
        );
    });
}



async function loginUser(req, res) {
    try {
        const { email, pw } = verifyParams(req.body);;
        const {_id, pwHash} = await getEmailAccount(email);
        const isPasswordValid = await verifyPW(pw, pwHash);
        const encodedJWT = await encodeJWT(_id);
        return res.status(200).json({ jwt: encodedJWT });
    } catch (err) {
        console.log("Login error", err);
        const { statusCode, msg } = err;
        if(statusCode) return res.status(statusCode).json({ statusCode, msg });
        return res.status(500).json({ statusCode: 500, msg: "Internal Error" });
    }
}



function getEmailAccount(email) {
    return new Promise((resolve, reject) => {
        Users.findOne({email},(err, data) =>{
                if (err) reject(err);
                else if (data === null) reject({statusCode: 401, msg: "Unsuccessful login"});
                else resolve({_id:data._id, pwHash: data.pwHash });
            }
        );
    });
}

function verifyPW(pw, pwHash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pw, pwHash, (err, result) => {
            if (err) reject(err);
            else if (result === false) reject({statusCode: 401, msg: "Unsuccessful login"});
            else resolve(true);
        });
    });
}



module.exports = {
    register: registerUser,
    login: loginUser
};
