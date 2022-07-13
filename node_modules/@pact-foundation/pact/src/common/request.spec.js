"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-expression no-empty no-console */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var nock = require("nock");
var request_1 = require("./request");
chai.use(chaiAsPromised);
var expect = chai.expect;
describe("Request", function () {
    var request;
    var port = 1024 + Math.floor(Math.random() * 5000);
    var url = "http://localhost:" + port;
    var urlSecure = "https://localhost:" + port;
    beforeEach(function () { return (request = new request_1.Request()); });
    context("#send", function () {
        afterEach(function () { return nock.cleanAll(); });
        describe("Promise", function () {
            it("returns a promise", function () {
                nock(url)
                    .get("/")
                    .reply(200);
                var r = request.send(request_1.HTTPMethod.GET, url);
                return Promise.all([
                    expect(r).is.ok,
                    expect(r.then).is.ok,
                    expect(r.then).is.a("function"),
                    expect(r).to.be.fulfilled,
                ]);
            });
            it("resolves when request succeeds with response body", function () {
                var body = "body";
                nock(url)
                    .get("/")
                    .reply(200, body);
                var p = request.send(request_1.HTTPMethod.GET, url);
                return Promise.all([
                    expect(p).to.be.fulfilled,
                    expect(p).to.eventually.be.equal(body),
                ]);
            });
            it("rejects when request fails with error message", function () {
                var error = "error";
                nock(url)
                    .get("/")
                    .reply(400, error);
                var p = request.send(request_1.HTTPMethod.GET, url);
                return expect(p).to.be.rejectedWith(error);
            });
        });
        describe("Headers", function () {
            it("sends Pact headers are sent with every request", function () {
                nock(url)
                    .matchHeader("X-Pact-Mock-Service", "true")
                    .get("/")
                    .reply(200);
                return expect(request.send(request_1.HTTPMethod.GET, url)).to.be.fulfilled;
            });
        });
        describe("SSL", function () {
            it("ignores self signed certificate errors", function () {
                nock(urlSecure)
                    .matchHeader("X-Pact-Mock-Service", "true")
                    .get("/")
                    .reply(200);
                return expect(request.send(request_1.HTTPMethod.GET, urlSecure)).to.be.fulfilled;
            });
        });
    });
});
//# sourceMappingURL=request.spec.js.map