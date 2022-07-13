"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-expression object-literal-sort-keys */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var request_1 = require("./common/request");
var interaction_1 = require("./dsl/interaction");
var mockService_1 = require("./dsl/mockService");
var pact_web_1 = require("./pact-web");
var expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);
describe("PactWeb", function () {
    var pact;
    var fullOpts = {
        cors: false,
        host: "127.0.0.1",
        logLevel: "info",
        pactfileWriteMode: "overwrite",
        port: 1234,
        spec: 2,
        ssl: false,
    };
    beforeEach(function () {
        pact = Object.create(pact_web_1.PactWeb.prototype);
        pact.opts = fullOpts;
    });
    afterEach(function () {
        sinon.restore();
    });
    describe("#addInteraction", function () {
        var interaction = {
            state: "i have a list of projects",
            uponReceiving: "a request for projects",
            withRequest: {
                headers: { Accept: "application/json" },
                method: request_1.HTTPMethod.GET,
                path: "/projects",
            },
            willRespondWith: {
                body: {},
                headers: { "Content-Type": "application/json" },
                status: 200,
            },
        };
        describe("when given a provider state", function () {
            it("creates interaction with state", function (done) {
                pact.mockService = {
                    addInteraction: function (int) { return Promise.resolve(int.state); },
                };
                expect(pact.addInteraction(interaction))
                    .to.eventually.have.property("providerState")
                    .notify(done);
            });
        });
        describe("when not given a provider state", function () {
            it("creates interaction with state", function (done) {
                pact.mockService = {
                    addInteraction: function (int) { return Promise.resolve(int.state); },
                };
                var interactionWithNoState = interaction;
                interactionWithNoState.state = undefined;
                expect(pact.addInteraction(interaction))
                    .to.eventually.not.have.property("providerState")
                    .notify(done);
            });
            describe("when given an Interaction as a builder", function () {
                it("creates interaction", function () {
                    var interaction2 = new interaction_1.Interaction()
                        .given("i have a list of projects")
                        .uponReceiving("a request for projects")
                        .withRequest({
                        method: request_1.HTTPMethod.GET,
                        path: "/projects",
                        headers: { Accept: "application/json" },
                    })
                        .willRespondWith({
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                        body: {},
                    });
                    pact.mockService = {
                        addInteraction: function (int) {
                            return Promise.resolve(int);
                        },
                    };
                    return expect(pact.addInteraction(interaction2)).to.eventually.have.property("given");
                });
            });
        });
    });
    describe("#verify", function () {
        describe("when pact verification is successful", function () {
            it("returns a successful promise and remove interactions", function () {
                pact.mockService = {
                    verify: function () { return Promise.resolve("verified!"); },
                    removeInteractions: function () { return Promise.resolve("removeInteractions"); },
                };
                var verifyPromise = pact.verify();
                return Promise.all([
                    expect(verifyPromise).to.eventually.eq("removeInteractions"),
                    expect(verifyPromise).to.eventually.be.fulfilled,
                ]);
            });
        });
        describe("when pact verification is unsuccessful", function () {
            it("throws an error", function () {
                var removeInteractionsStub = sinon
                    .stub(mockService_1.MockService.prototype, "removeInteractions")
                    .resolves("removeInteractions");
                pact.mockService = {
                    verify: function () { return Promise.reject("not verified!"); },
                    removeInteractions: function () { return removeInteractionsStub; },
                };
                var verifyPromise = pact.verify();
                return Promise.all([
                    expect(verifyPromise).to.eventually.be.rejectedWith(Error),
                    verifyPromise.catch(function (e) {
                        expect(removeInteractionsStub).to.callCount(0);
                    }),
                ]);
            });
        });
        describe("when pact verification is successful", function () {
            describe("and an error is thrown in the cleanup", function () {
                it("throws an error", function () {
                    pact.mockService = {
                        verify: function () { return Promise.resolve("verified!"); },
                        removeInteractions: function () {
                            throw new Error("error removing interactions");
                        },
                    };
                    return expect(pact.verify()).to.eventually.be.rejectedWith(Error);
                });
            });
        });
    });
    describe("#finalize", function () {
        describe("when writing Pact is successful", function () {
            it("returns a successful promise and shut down down the mock server", function () {
                pact.mockService = {
                    writePact: function () { return Promise.resolve("pact file written!"); },
                    removeInteractions: sinon.stub(),
                };
                var writePactPromise = pact.finalize();
                return expect(writePactPromise).to.eventually.be.fulfilled;
            });
        });
        describe("when writing Pact is unsuccessful", function () {
            it("throws an error", function () {
                pact.mockService = {
                    writePact: function () { return Promise.reject(new Error("pact not file written!")); },
                    removeInteractions: sinon.stub(),
                };
                return expect(pact.finalize()).to.eventually.be.rejectedWith(Error);
            });
        });
    });
    describe("#writePact", function () {
        describe("when writing Pact is successful", function () {
            it("returns a successful promise", function () {
                pact.mockService = {
                    writePact: function () { return Promise.resolve("pact file written!"); },
                    removeInteractions: sinon.stub(),
                };
                var writePactPromise = pact.writePact();
                return Promise.all([
                    expect(writePactPromise).to.eventually.eq("pact file written!"),
                    expect(writePactPromise).to.eventually.be.fulfilled,
                ]);
            });
        });
    });
    describe("#removeInteractions", function () {
        describe("when removing interactions is successful", function () {
            it("returns a successful promise", function () {
                pact.mockService = {
                    removeInteractions: function () { return Promise.resolve("interactions removed!"); },
                };
                var removeInteractionsPromise = pact.removeInteractions();
                return Promise.all([
                    expect(removeInteractionsPromise).to.eventually.eq("interactions removed!"),
                    expect(removeInteractionsPromise).to.eventually.be.fulfilled,
                ]);
            });
        });
    });
});
//# sourceMappingURL=pact-web.spec.js.map