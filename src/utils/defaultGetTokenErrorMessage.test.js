import defaultGetTokenErrorMessage from './defaultGetTokenErrorMessage.ts';
import {
  DEFAULT_VALUE_TYPE,
  OBJECT_VALUE_TYPE,
} from '../__fixtures__/tokens.fixtures';

describe('defaultGetTokenErrorMessage()', () => {
  describe('tokenMeta.error is `undefined`', () => {
    const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.BASED;

    it('should return tokenMeta.error`', () => {
      expect(defaultGetTokenErrorMessage(tokenValue, tokenMeta)).toBe(
        tokenMeta.error
      );
    });
  });

  describe('tokenMeta.error is `null`', () => {
    const { tokenValue, tokenMeta } = OBJECT_VALUE_TYPE.BASED;

    it('should return tokenMeta.error`', () => {
      expect(defaultGetTokenErrorMessage(tokenValue, tokenMeta)).toBe(
        tokenMeta.error
      );
    });
  });

  describe('tokenMeta.error is `string`', () => {
    const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.WITH_ERROR;

    it('should return tokenMeta.error`', () => {
      expect(defaultGetTokenErrorMessage(tokenValue, tokenMeta)).toBe(
        tokenMeta.error
      );
    });
  });

  describe('tokenMeta.error is NOT `string` nor `Nullish`', () => {
    const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.BOOLEAN_TYPE_ERROR;

    it('should return tokenMeta.error`', () => {
      // Test the type of a thrown exception in Jest
      // https://stackoverflow.com/a/46155381/16245905
      const foo = () => {
        defaultGetTokenErrorMessage(tokenValue, tokenMeta);
      };
      expect(foo).toThrow(TypeError);
      expect(foo).toThrow(
        '"onGetTokenErrorMessage" is required when "ErrorType" not "string"'
      );
    });
  });
});
