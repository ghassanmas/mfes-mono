import { PublisherOptions } from "@pact-foundation/pact-node";
export declare class Publisher {
    private opts;
    constructor(opts: PublisherOptions);
    publishPacts(): Promise<string[]>;
}
