import getDefaultTokenEditableValue from './getDefaultTokenEditableValue';
import {
  MOCK_TOKEN_VALUES,
  MOCK_TOKEN_METAS,
} from '../__fixtures__/defaultToken.fixtures';

describe('getDefaultTokenEditableValue()', () => {
  it('should return tokenValue`', () => {
    MOCK_TOKEN_VALUES.forEach((tokenValue, idx) => {
      const tokenMeta = MOCK_TOKEN_METAS[idx];
      expect(getDefaultTokenEditableValue(tokenValue, tokenMeta)).toBe(
        tokenValue
      );
    });
  });
});
