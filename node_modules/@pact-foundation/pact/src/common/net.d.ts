/**
 * Network module.
 * @module net
 * @private
 */
export declare const localAddresses: string[];
declare const isPortAvailable: (port: number, host: string) => Promise<void>;
declare const portCheck: (port: number, host: string) => Promise<void>;
export { isPortAvailable, portCheck };
