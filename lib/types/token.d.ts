export declare type InputValue = string;
export declare type TokenValue = string | number | object;
export declare type TokenIndex = number;
export declare type TokenActivated = boolean;
export declare type TokenError = any;
export declare type TokenMetaKey = string;
export declare type TokenMeta = {
    key: TokenMetaKey;
    activated: TokenActivated;
    error: TokenError;
};
