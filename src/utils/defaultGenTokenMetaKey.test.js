import defaultGenTokenMetaKey from './defaultGenTokenMetaKey.ts';
import {
  DEFAULT_VALUE_TYPE,
  OBJECT_VALUE_TYPE,
} from '../__fixtures__/tokens.fixtures';

const MOCK_TOKEN_INDEX = 0;

describe('defaultGenTokenMetaKey() with default string type tokenValue', () => {
  it('should return `tokenMetaKey`', () => {
    const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.BASED;
    expect(defaultGenTokenMetaKey(tokenValue, MOCK_TOKEN_INDEX)).toEqual(
      tokenMeta.key
    );
  });
});

describe('buildTokenMeta() with object type tokenValue', () => {
  it('should return `tokenMeta`', () => {
    const { tokenValue, tokenMeta } = OBJECT_VALUE_TYPE.BASED;
    expect(defaultGenTokenMetaKey(tokenValue, MOCK_TOKEN_INDEX)).toEqual(
      tokenMeta.key
    );
  });
});
