'use strict';

const assert = require("assert");
const request = require("request");

describe("AsyncAwaitAPI", => {

  describe("Account Registration", => {
    it("should return 200 OK and JWT on account registration success", => {

    })

    it("should return 400 error if email is already registered", => {

    })

    it("should return 406 error if email field is empty", => {

    })

    it("should return 406 error if password field is empty", => {

    })
  })

   describe("Account Login", => {
    it("should return 200 OK and JWT on account login success", => {

    })

    it("should return 401 error when providing nonexistant email", => {

    })

    it("should return 401 error when providing incorrect password", => {

    })

    it("should return 406 error if email field is empty", => {

    })

    it("should return 406 error if password field is empty", => {

    })
  })

})

