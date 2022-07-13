import { Interaction, InteractionObject } from "./dsl/interaction";
import { MockService, PactfileWriteMode } from "./dsl/mockService";
import { PactOptions, LogLevel, MandatoryPactOptions } from "./dsl/options";
export interface PactWebOptions {
    port?: number;
    host?: string;
    ssl?: boolean;
    sslcert?: string;
    sslkey?: string;
    dir?: string;
    log?: string;
    logLevel?: LogLevel;
    spec?: number;
    cors?: boolean;
    pactfileWriteMode?: PactfileWriteMode;
}
export declare type PactWebOptionsComplete = PactOptions & MandatoryPactOptions;
/**
 * Creates a new {@link PactWeb}.
 * @memberof Pact
 * @name create
 * @param {PactOptions} opts
 * @return {@link PactWeb}
 * @static
 */
export declare class PactWeb {
    mockService: MockService;
    server: any;
    opts: PactWebOptionsComplete;
    constructor(config?: PactWebOptions);
    /**
     * Add an interaction to the {@link MockService}.
     * @memberof PactProvider
     * @instance
     * @param {Interaction} interactionObj
     * @returns {Promise}
     */
    addInteraction(interactionObj: InteractionObject | Interaction): Promise<string>;
    /**
     * Checks with the Mock Service if the expected interactions have been exercised.
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    verify(): Promise<string>;
    /**
     * Writes the Pact and clears any interactions left behind.
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    finalize(): Promise<string>;
    /**
     * Writes the Pact file but leave interactions in.
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    writePact(): Promise<string>;
    /**
     * Clear up any interactions in the Provider Mock Server.
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    removeInteractions(): Promise<string>;
}
/**
 * Exposes {@link Matchers}
 * To avoid polluting the root module's namespace, re-export
 * Matchers as its owns module
 * @memberof Pact
 * @static
 */
import * as Matchers from "./dsl/matchers";
export import Matchers = Matchers;
/**
 * Exposes {@link Interaction}
 * @memberof Pact
 * @static
 */
export * from "./dsl/interaction";
/**
 * Exposes {@link MockService}
 * @memberof Pact
 * @static
 */
export * from "./dsl/mockService";
/**
 * Exposes {@link GraphQL}
 * @memberof Pact
 * @static
 */
export * from "./dsl/graphql";
/**
 * Exposes {@link ApolloGraphQL}
 * @memberof Pact
 * @static
 */
export * from "./dsl/apolloGraphql";
