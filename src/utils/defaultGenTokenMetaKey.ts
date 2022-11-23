import { TokenIndex } from '../types/token';

function defaultGenTokenMetaKey<ValueType>(
  tokenValue: ValueType,
  tokenIndex: TokenIndex
): string {
  return `${JSON.stringify(tokenValue)}-${tokenIndex}`;
}

export default defaultGenTokenMetaKey;
