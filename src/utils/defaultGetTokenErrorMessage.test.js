import defaultGetTokenErrorMessage from './defaultGetTokenErrorMessage.ts';
import { DEFAULT_VALUE_TYPE } from '../__fixtures__/tokens.fixtures';

describe('defaultGetTokenErrorMessage()', () => {
  describe('tokenMeta.error is string', () => {
    const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.WITH_ERROR;

    it('should return tokenMeta.error`', () => {
      expect(defaultGetTokenErrorMessage(tokenValue, tokenMeta)).toBe(
        tokenMeta.error
      );
    });
  });

  describe('tokenMeta.error is NOT string', () => {
    const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.BOOLEAN_TYPE_ERROR;

    it('should return tokenMeta.error`', () => {
      expect(
        defaultGetTokenErrorMessage(tokenValue, tokenMeta)
      ).toBeUndefined();
    });
  });
});
