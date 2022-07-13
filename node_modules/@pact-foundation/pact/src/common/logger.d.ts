import pino = require("pino");
declare const logger: pino.Logger;
export declare const setLogLevel: (wantedLevel?: number | "error" | "debug" | "info" | "warn" | "fatal" | "trace" | undefined) => number | void;
export declare const traceHttpInteractions: () => void;
export default logger;
