"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-expression no-empty */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var messageProviderPact_1 = require("./messageProviderPact");
var sinonChai = require("sinon-chai");
var express = require("express");
var http = require("http");
chai.use(sinonChai);
chai.use(chaiAsPromised);
var expect = chai.expect;
describe("MesageProvider", function () {
    var provider;
    var successfulRequest = "successfulRequest";
    var unsuccessfulRequest = "unsuccessfulRequest";
    var successfulMessage = {
        contents: { foo: "bar" },
        description: successfulRequest,
        providerStates: [{ name: "some state" }],
    };
    var unsuccessfulMessage = {
        contents: { foo: "bar" },
        description: unsuccessfulRequest,
        providerStates: [{ name: "some state not found" }],
    };
    var nonExistentMessage = {
        contents: { foo: "bar" },
        description: "does not exist",
        providerStates: [{ name: "some state not found" }],
    };
    beforeEach(function () {
        provider = new messageProviderPact_1.MessageProviderPact({
            logLevel: "error",
            messageProviders: {
                successfulRequest: function () { return Promise.resolve("yay"); },
                unsuccessfulRequest: function () { return Promise.reject("nay"); },
            },
            provider: "myprovider",
            stateHandlers: {
                "some state": function () { return Promise.resolve("yay"); },
            },
        });
    });
    describe("#constructor", function () {
        it("creates a Provider when all mandatory parameters are provided", function () {
            expect(provider).to.be.a("object");
            expect(provider).to.respondTo("verify");
        });
        it("creates a Provider with default log level if not specified", function () {
            provider = new messageProviderPact_1.MessageProviderPact({
                messageProviders: {},
                provider: "myprovider",
            });
            expect(provider).to.be.a("object");
            expect(provider).to.respondTo("verify");
        });
    });
    describe("#setupVerificationHandler", function () {
        describe("when their is a valid setup", function () {
            it("creates a valid express handler", function (done) {
                var setupVerificationHandler = provider.setupVerificationHandler.bind(provider)();
                var req = { body: successfulMessage };
                var res = {
                    json: function () { return done(); },
                };
                setupVerificationHandler(req, res);
            });
        });
        describe("when their is an invalid setup", function () {
            it("creates a valid express handler that rejects the message", function (done) {
                var setupVerificationHandler = provider.setupVerificationHandler.bind(provider)();
                var req = { body: nonExistentMessage };
                var res = {
                    status: function (status) {
                        expect(status).to.eq(500);
                        return {
                            send: function () { return done(); },
                        };
                    },
                };
                setupVerificationHandler(req, res);
            });
        });
    });
    describe("#findHandler", function () {
        describe("when given a handler that exists", function () {
            it("returns a Handler object", function () {
                var findHandler = provider.findHandler.bind(provider);
                return expect(findHandler(successfulMessage)).to.eventually.be.a("function");
            });
        });
        describe("when given a handler that does not exist", function () {
            it("returns a failed promise", function () {
                var findHandler = provider.findHandler.bind(provider);
                return expect(findHandler("doesnotexist")).to.eventually.be.rejected;
            });
        });
    });
    describe("#setupStates", function () {
        describe("when given a handler that exists", function () {
            it("returns values of all resolved handlers", function () {
                var findStateHandler = provider.setupStates.bind(provider);
                return expect(findStateHandler(successfulMessage)).to.eventually.deep.equal(["yay"]);
            });
        });
        describe("when given a state that does not have a handler", function () {
            it("returns an empty promise", function () {
                provider = new messageProviderPact_1.MessageProviderPact({
                    messageProviders: {},
                    provider: "myprovider",
                });
                var findStateHandler = provider.setupStates.bind(provider);
                return expect(findStateHandler(unsuccessfulMessage)).to.eventually.deep.equal([]);
            });
        });
    });
    describe("#waitForServerReady", function () {
        describe("when the http server starts up", function () {
            it("returns a resolved promise", function () {
                var waitForServerReady = provider.waitForServerReady;
                var server = http.createServer(function () { }).listen();
                return expect(waitForServerReady(server)).to.eventually.be.fulfilled;
            });
        });
    });
    describe("#setupProxyServer", function () {
        describe("when the http server starts up", function () {
            it("returns a resolved promise", function () {
                var setupProxyServer = provider.setupProxyServer;
                var app = express();
                expect(setupProxyServer(app)).to.be.an.instanceOf(http.Server);
            });
        });
    });
    describe("#setupProxyApplication", function () {
        it("returns a valid express app", function () {
            var setupProxyApplication = provider.setupProxyApplication.bind(provider);
            expect(setupProxyApplication().listen).to.be.a("function");
        });
    });
});
//# sourceMappingURL=messageProviderPact.spec.js.map