'use strict';

const assert = require("assert");
const request = require("request");
'use strict';

const baseURL = 'http://localhost:8888/api';
const uuid = require("uuid");
const email = uuid.v1() + "@example.com";
const password = 'password';

describe("AsyncAwaitAPI", () => {

    describe("Account Registration", () => {
        it("should return 200-OK and JWT on account registration success", done => {
            request({
                    method: 'POST',
                    uri: baseURL + '/register',
                    json: { email, password }
                },
                (err, res, body) => {
                    if (err) throw err;
                    assert.equal(res.statusCode, 200);
                    assert.equal(typeof body.jwt, 'string');
                    done();
                })
        })

        it("should return 400-Bad Request if email is already registered", done => {
            request({
                    method: 'POST',
                    uri: baseURL + '/register',
                    json: { email, password }
                },
                (err, res, body) => {
                    if (err) throw err;
                    assert.equal(res.statusCode, 400);
                    done();
                })
        })

        it("should return 406-Not Acceptable if email field is empty", done => {
            request({
                    method: 'POST',
                    uri: baseURL + '/register',
                    json: { password }
                },
                (err, res, body) => {
                    if (err) throw err;
                    assert.equal(res.statusCode, 406);
                    done();
                })
        })

        it("should return 406Not Acceptable if password field is empty", done => {
            request({
                    method: 'POST',
                    uri: baseURL + '/register',
                    json: { email }
                },
                (err, res, body) => {
                    if (err) throw err;
                    assert.equal(res.statusCode, 406);
                    done();
                })
        })
    })


    describe("Account Login", () => {
        it("should return 200 OK and JWT on account login success", done => {
            request({
                    method: 'POST',
                    uri: baseURL + '/login',
                    json: { email, password }
                },
                (err, res, body) => {
                    if (err) throw err;
                    assert.equal(res.statusCode, 200);
                    assert.equal(typeof body.jwt, 'string');
                    done();
                })
        })

        it("should return 401-Unauthorized when logging in with unregistered email", done => {
            request({
                    method: 'POST',
                    uri: baseURL + '/login',
                    json: { email: 'unregistered@example.com', password }
                },
                (err, res, body) => {
                    if (err) throw err;
                    assert.equal(res.statusCode, 401);
                    done();
                })
        })

        it("should return 401-Unauthorized when providing incorrect password", done => {
            request({
                    method: 'POST',
                    uri: baseURL + '/login',
                    json: { email, password: 'incorrect' }
                },
                (err, res, body) => {
                    if (err) throw err;
                    assert.equal(res.statusCode, 401);
                    done();
                })
        })

        it("should return 406-Not Acceptable if email field is empty", done => {
            request({
                    method: 'POST',
                    uri: baseURL + '/login',
                    json: {password }
                },
                (err, res, body) => {
                    if (err) throw err;
                    assert.equal(res.statusCode, 406);
                    done();
                })
        })

        it("should return 406-Not Acceptable if password field is empty", done => {
          request({
                    method: 'POST',
                    uri: baseURL + '/login',
                    json: { email }
                },
                (err, res, body) => {
                    if (err) throw err;
                    assert.equal(res.statusCode, 406);
                    done();
                })
        })
    })

})