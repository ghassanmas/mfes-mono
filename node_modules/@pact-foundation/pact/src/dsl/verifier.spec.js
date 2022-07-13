"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-expression no-empty no-string-literal*/
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require("sinon");
var verifier_1 = require("./verifier");
var pact_node_1 = require("@pact-foundation/pact-node");
var logger_1 = require("../common/logger");
var express = require("express");
chai.use(chaiAsPromised);
var expect = chai.expect;
describe("Verifier", function () {
    afterEach(function () {
        sinon.restore();
    });
    var state = "thing exists";
    var v;
    var opts;
    var executed;
    var providerBaseUrl = "http://not.exists";
    // Little function to mock out an Event Emitter
    var fakeServer = function (event) { return ({
        on: function (registeredEvent, cb) {
            if (registeredEvent === event) {
                cb();
            }
        },
    }); };
    beforeEach(function () {
        var _a;
        executed = false;
        opts = {
            providerBaseUrl: providerBaseUrl,
            requestFilter: function (req, res, next) {
                next();
            },
            stateHandlers: (_a = {},
                _a[state] = function () {
                    executed = true;
                    return Promise.resolve("done");
                },
                _a),
        };
    });
    describe("#constructor", function () {
        describe("when given configuration", function () {
            it("sets the configuration on the object", function () {
                v = new verifier_1.Verifier(opts);
                expect(v)
                    .to.have.deep.property("config")
                    .includes({
                    providerBaseUrl: providerBaseUrl,
                });
                expect(v).to.have.nested.property("config.stateHandlers");
                expect(v).to.have.nested.property("config.requestFilter");
            });
        });
        describe("when no configuration is given", function () {
            it("does not set the configuration on the object", function () {
                v = new verifier_1.Verifier();
                expect(v).to.not.have.deep.property("config");
            });
        });
    });
    describe("#setConfig", function () {
        var spy;
        beforeEach(function () {
            spy = sinon.spy(pact_node_1.default, "logLevel");
            v = new verifier_1.Verifier(opts);
        });
        context("when logLevel is provided", function () {
            it("sets the log level on pact node", function () {
                v["setConfig"](__assign(__assign({}, opts), { logLevel: "debug" }));
                expect(spy.callCount).to.eql(1);
            });
        });
        context("when logLevel is not provided", function () {
            it("does not modify the log setting", function () {
                v["setConfig"](__assign({}, opts));
                expect(spy.callCount).to.eql(0);
            });
        });
        context("when a deprecated field is provided", function () {
            it("logs a warning", function () {
                spy = sinon.spy(logger_1.default, "warn");
                v["setConfig"](__assign(__assign({}, opts), { providerStatesSetupUrl: "http://foo.com" }));
                expect(spy.callCount).to.eql(1);
            });
        });
    });
    describe("#setupStates", function () {
        describe("when there are provider states on the pact", function () {
            describe("and there are handlers associated with those states", function () {
                it("executes the handler and returns a set of Promises", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                v = new verifier_1.Verifier(opts);
                                return [4 /*yield*/, v["setupStates"]({
                                        states: [state],
                                    })];
                            case 1:
                                res = _a.sent();
                                expect(res).lengthOf(1);
                                expect(executed).to.be.true;
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe("and there are no handlers associated with those states", function () {
                it("executes the handler and returns an empty Promise", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var spy, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                spy = sinon.spy(logger_1.default, "warn");
                                delete opts.stateHandlers;
                                v = new verifier_1.Verifier(opts);
                                return [4 /*yield*/, v["setupStates"]({
                                        states: [state],
                                    })];
                            case 1:
                                res = _a.sent();
                                expect(res).lengthOf(0);
                                expect(spy.callCount).to.eql(1);
                                expect(executed).to.be.false;
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe("when there are no provider states on the pact", function () {
            it("executes the handler and returns an empty Promise", function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            v = new verifier_1.Verifier(opts);
                            return [4 /*yield*/, v["setupStates"]({})];
                        case 1:
                            res = _a.sent();
                            expect(res).lengthOf(0);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("#verifyProvider", function () {
        beforeEach(function () {
            v = new verifier_1.Verifier();
            sinon.stub(v, "startProxy").returns({
                close: function () {
                    executed = true;
                },
            });
            sinon.stub(v, "waitForServerReady").returns(Promise.resolve());
        });
        describe("when no configuration has been given", function () {
            it("fails with an error", function () {
                return expect(v.verifyProvider()).to.eventually.be.rejectedWith(Error);
            });
        });
        describe("when the verifier has been configured", function () {
            context("and the verification runs successfully", function () {
                it("closes the server and returns the result", function () {
                    sinon
                        .stub(v, "runProviderVerification")
                        .returns(Promise.resolve("done"));
                    var res = v.verifyProvider(opts);
                    return expect(res).to.eventually.be.fulfilled.then(function () {
                        expect(executed).to.be.true;
                    });
                });
            });
            context("and the verification fails", function () {
                it("closes the server and returns the result", function () {
                    sinon
                        .stub(v, "runProviderVerification")
                        .returns(function () { return Promise.reject("error"); });
                    var res = v.verifyProvider(opts);
                    return expect(res).to.eventually.be.rejected.then(function () {
                        expect(executed).to.be.true;
                    });
                });
            });
        });
    });
    describe("#waitForServerReady", function () {
        beforeEach(function () {
            v = new verifier_1.Verifier();
        });
        context("when the server starts successfully", function () {
            it("returns a successful promise", function () {
                var res = v["waitForServerReady"](fakeServer("listening"));
                return expect(res).to.eventually.be.fulfilled;
            });
        });
        context("when the server fails to start", function () {
            it("returns an error", function () {
                var res = v["waitForServerReady"](fakeServer("error"));
                return expect(res).to.eventually.be.rejected;
            });
        });
    });
    describe("#createProxyStateHandler", function () {
        v = new verifier_1.Verifier();
        var res;
        var mockResponse = {
            sendStatus: function (status) {
                res = status;
            },
            status: function (status) {
                res = status;
                return {
                    send: function () { },
                };
            },
        };
        context("when valid state handlers are provided", function () {
            it("returns a 200", function () {
                sinon.stub(v, "setupStates").returns(Promise.resolve());
                var h = v["createProxyStateHandler"]();
                return expect(h({}, mockResponse)).to.eventually.be.fulfilled.then(function () {
                    expect(res).to.eql(200);
                });
            });
        });
        context("when there is a problem with a state handler", function () {
            it("returns a 500", function () {
                sinon
                    .stub(v, "setupStates")
                    .returns(Promise.reject("state error"));
                var h = v["createProxyStateHandler"]();
                return expect(h({}, mockResponse)).to.eventually.be.fulfilled.then(function () {
                    expect(res).to.eql(500);
                });
            });
        });
    });
    describe("#startProxy", function () {
        v = new verifier_1.Verifier();
        it("starts a given http.Server", function () {
            v["startProxy"](express());
        });
    });
});
//# sourceMappingURL=verifier.spec.js.map