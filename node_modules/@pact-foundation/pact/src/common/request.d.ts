export declare enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    COPY = "COPY",
    LOCK = "LOCK",
    MKCOL = "MKCOL",
    MOVE = "MOVE",
    PROPFIND = "PROPFIND",
    PROPPATCH = "PROPPATCH",
    UNLOCK = "UNLOCK",
    REPORT = "REPORT"
}
export declare type methods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | "COPY" | "LOCK" | "MKCOL" | "MOVE" | "PROPFIND" | "PROPPATCH" | "UNLOCK" | "REPORT";
export declare class Request {
    private readonly transport;
    send(method: HTTPMethod | methods, url: string, body?: string): Promise<string>;
}
