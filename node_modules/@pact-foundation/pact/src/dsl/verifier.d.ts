import { VerifierOptions as PactNodeVerifierOptions } from "@pact-foundation/pact-node";
import * as express from "express";
import { LogLevel } from "./options";
export interface ProviderState {
    states?: [string];
}
export interface StateHandler {
    [name: string]: () => Promise<unknown>;
}
export declare type Hook = () => Promise<unknown>;
interface ProxyOptions {
    logLevel?: LogLevel;
    requestFilter?: express.RequestHandler;
    stateHandlers?: StateHandler;
    beforeEach?: Hook;
    afterEach?: Hook;
    validateSSL?: boolean;
    changeOrigin?: boolean;
}
export declare type VerifierOptions = PactNodeVerifierOptions & ProxyOptions;
export declare class Verifier {
    private address;
    private stateSetupPath;
    private config;
    private deprecatedFields;
    constructor(config?: VerifierOptions);
    /**
     * Verify a HTTP Provider
     *
     * @param config
     */
    verifyProvider(config?: VerifierOptions): Promise<any>;
    private runProviderVerification;
    private waitForServerReady;
    private startProxy;
    private createProxy;
    private createProxyStateHandler;
    private registerBeforeHook;
    private registerAfterHook;
    private createRequestTracer;
    private createResponseTracer;
    private setupStates;
    private setConfig;
    private isLocalVerification;
}
export {};
