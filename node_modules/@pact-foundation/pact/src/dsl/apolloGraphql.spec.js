"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var apolloGraphql_1 = require("./apolloGraphql");
chai.use(chaiAsPromised);
var expect = chai.expect;
describe("ApolloGraphQLInteraction", function () {
    var interaction;
    beforeEach(function () {
        interaction = new apolloGraphql_1.ApolloGraphQLInteraction();
    });
    describe("#withVariables", function () {
        describe("when given a set of variables", function () {
            it("adds the variables to the payload", function () {
                interaction.uponReceiving("a request");
                interaction.withOperation("query");
                interaction.withQuery("{ hello }");
                interaction.withVariables({
                    foo: "bar",
                });
                var json = interaction.json();
                expect(json.request.body.variables).to.deep.eq({ foo: "bar" });
            });
        });
        describe("when no variables are presented", function () {
            it("adds an empty variables property to the payload", function () {
                interaction.uponReceiving("a request");
                interaction.withOperation("query");
                interaction.withQuery("{ hello }");
                var json = interaction.json();
                expect(json.request.body).to.have.property("variables");
            });
        });
    });
    describe("#withOperation", function () {
        describe("when no operationNaame is presented", function () {
            it("adds a null operationName property to the payload", function () {
                interaction.uponReceiving("a request");
                interaction.withQuery("{ hello }");
                var json = interaction.json();
                expect(json.request.body).to.have.property("operationName");
            });
        });
    });
});
//# sourceMappingURL=apolloGraphql.spec.js.map