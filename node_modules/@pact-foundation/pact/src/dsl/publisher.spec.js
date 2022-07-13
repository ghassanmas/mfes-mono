"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-expression no-empty no-string-literal*/
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var publisher_1 = require("./publisher");
chai.use(chaiAsPromised);
var expect = chai.expect;
describe("Publisher", function () {
    describe("#constructor", function () {
        it("constructs a valid Pubisher class", function () {
            var p = new publisher_1.Publisher({
                consumerVersion: "1.0.0",
                pactBroker: "http://foo.com",
                pactFilesOrDirs: [],
            });
            expect(p).to.have.nested.property("opts.consumerVersion");
        });
    });
});
//# sourceMappingURL=publisher.spec.js.map