"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-expression no-empty */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var messageConsumerPact_1 = require("./messageConsumerPact");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
chai.use(chaiAsPromised);
var expect = chai.expect;
describe("MessageConsumer", function () {
    var consumer;
    beforeEach(function () {
        consumer = new messageConsumerPact_1.MessageConsumerPact({
            consumer: "myconsumer",
            provider: "myprovider",
        });
    });
    var testMessage = {
        contents: {
            foo: "bar",
        },
    };
    describe("#constructor", function () {
        it("creates a Consumer when all mandatory parameters are provided", function () {
            expect(consumer).to.be.a("object");
            expect(consumer).to.respondTo("verify");
        });
    });
    describe("#dsl", function () {
        describe("when a valid Message has been constructed", function () {
            it("the state should be valid", function () {
                consumer
                    .given("some state")
                    .expectsToReceive("A message about something")
                    .withContent({ foo: "bar" })
                    .withMetadata({ baz: "bat" });
                return expect(consumer.validate()).to.eventually.be.fulfilled;
            });
        });
        describe("when a valid state has been given", function () {
            it("the state should be save id in v3 format", function () {
                consumer
                    .given("some state")
                    .expectsToReceive("A message about something")
                    .withContent({ foo: "bar" })
                    .withMetadata({ baz: "bat" });
                expect(consumer.json().providerStates).to.be.a("array");
                expect(consumer.json().providerStates).to.deep.eq([
                    { name: "some state" },
                ]);
            });
        });
        describe("when a valid Message has not been constructed", function () {
            it("the state should not be valid", function () {
                consumer
                    .given("some state")
                    .expectsToReceive("A message about something")
                    .withMetadata({ baz: "bat" });
                return expect(consumer.validate()).to.eventually.be.rejected;
            });
        });
        describe("when an empty description has been given", function () {
            it("it should throw an error", function () {
                expect(function () {
                    consumer.expectsToReceive("");
                }).to.throw(Error);
            });
        });
        describe("when an empty content object has been given", function () {
            it("it should throw an error", function () {
                expect(function () {
                    consumer.withContent({});
                }).to.throw(Error);
            });
        });
        describe("when an empty metadata object has been given", function () {
            it("it should throw an error", function () {
                expect(function () {
                    consumer.withMetadata({});
                }).to.throw(Error);
            });
        });
    });
    describe("#verify", function () {
        describe("when given a valid handler and message", function () {
            it("verifies the consumer message", function () {
                var stubbedConsumer = new messageConsumerPact_1.MessageConsumerPact({
                    consumer: "myconsumer",
                    provider: "myprovider",
                });
                var stub = stubbedConsumer;
                // Stub out service factory
                stub.getServiceFactory = function () {
                    return {
                        createMessage: function (opts) { return Promise.resolve("message created"); },
                    };
                };
                stubbedConsumer
                    .given("some state")
                    .expectsToReceive("A message about something")
                    .withContent({ foo: "bar" })
                    .withMetadata({ baz: "bat" });
                return expect(stubbedConsumer.verify(function (m) { return Promise.resolve("yay!"); })).to.eventually.be.fulfilled;
            });
        });
    });
    describe("#json", function () {
        it("returns a valid Message object", function () {
            consumer.withContent({ foo: "bar" });
            var m = consumer.json();
            expect(m.contents).to.deep.eq({ foo: "bar" });
        });
    });
    describe("#getServiceFactory", function () {
        it("returns a valid pact-node object", function () {
            var serviceFactory = consumer.getServiceFactory();
            expect(serviceFactory).to.be.a("object");
            expect(serviceFactory).to.respondTo("createMessage");
        });
    });
    describe("handler transformers", function () {
        describe("#asynchronousbodyHandler", function () {
            describe("when given a function that succeeds", function () {
                it("returns a Handler object that returns a completed promise", function () {
                    var failFn = function (obj) { return Promise.resolve("yay!"); };
                    var hFn = messageConsumerPact_1.asynchronousBodyHandler(failFn);
                    return expect(hFn(testMessage)).to.eventually.be.fulfilled;
                });
            });
            describe("when given a function that throws an Exception", function () {
                it("returns a Handler object that returns a rejected promise", function () {
                    var failFn = function (obj) { return Promise.reject("fail"); };
                    var hFn = messageConsumerPact_1.asynchronousBodyHandler(failFn);
                    return expect(hFn(testMessage)).to.eventually.be.rejected;
                });
            });
        });
        describe("#synchronousbodyHandler", function () {
            describe("when given a function that succeeds", function () {
                it("returns a Handler object that returns a completed promise", function () {
                    var failFn = function (obj) {
                        /* do nothing! */
                    };
                    var hFn = messageConsumerPact_1.synchronousBodyHandler(failFn);
                    return expect(hFn(testMessage)).to.eventually.be.fulfilled;
                });
            });
            describe("when given a function that throws an Exception", function () {
                it("returns a Handler object that returns a rejected promise", function () {
                    var failFn = function (obj) {
                        throw new Error("fail");
                    };
                    var hFn = messageConsumerPact_1.synchronousBodyHandler(failFn);
                    return expect(hFn(testMessage)).to.eventually.be.rejected;
                });
            });
        });
    });
});
//# sourceMappingURL=messageConsumerPact.spec.js.map