import type { TokenIndex, TokenMeta } from '../types/token';
declare type Params<ErrorType> = {
    tokenMetaKey: string;
    tokenIndex: TokenIndex;
    customizeError: TokenMeta<ErrorType>['error'];
};
declare function buildTokenMeta<ErrorType>(params: Params<ErrorType>): TokenMeta<ErrorType>;
export default buildTokenMeta;
