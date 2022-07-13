"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
/**
 * Pact Publisher service
 * @module Publisher
 */
var utils_1 = require("../common/utils");
var pact_node_1 = require("@pact-foundation/pact-node");
var Publisher = /** @class */ (function () {
    function Publisher(opts) {
        this.opts = opts;
    }
    Publisher.prototype.publishPacts = function () {
        return utils_1.qToPromise(pact_node_1.default.publishPacts(this.opts));
    };
    return Publisher;
}());
exports.Publisher = Publisher;
//# sourceMappingURL=publisher.js.map