"use strict";
/**
 * Network module.
 * @module net
 * @private
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.portCheck = exports.isPortAvailable = exports.localAddresses = void 0;
var net = require("net");
var bluebird_1 = require("bluebird");
exports.localAddresses = ["127.0.0.1", "localhost", "0.0.0.0", "::1"];
var isPortAvailable = function (port, host) {
    return Promise.resolve(bluebird_1.Promise
        .map(exports.localAddresses, 
    // we meed to wrap the built-in Promise with bluebird.reflect() so we can
    // test the result of the promise without failing bluebird.map()
    function (h) { return bluebird_1.Promise.resolve(portCheck(port, h)).reflect(); }, 
    // do each port check sequentially (as localhost & 127.0.0.1 will conflict on most default environments)
    { concurrency: 1 })
        .then(function (inspections) {
        // if every port check failed, then fail the `isPortAvailable` check
        if (inspections.every(function (inspection) { return !inspection.isFulfilled(); })) {
            return Promise.reject(new Error("Cannot open port " + port + " on ipv4 or ipv6 interfaces"));
        }
        // the local addresses passed - now check the host that the user has specified
        return portCheck(port, host);
    }));
};
exports.isPortAvailable = isPortAvailable;
var portCheck = function (port, host) {
    return new Promise(function (resolve, reject) {
        var server = net
            .createServer()
            .listen({ port: port, host: host, exclusive: true })
            .on("error", function (e) {
            if (e.code === "EADDRINUSE") {
                reject(new Error("Port " + port + " is unavailable on address " + host));
            }
            else {
                reject(e);
            }
        })
            .on("listening", function () {
            server.once("close", function () { return resolve(); }).close();
        });
    });
};
exports.portCheck = portCheck;
//# sourceMappingURL=net.js.map