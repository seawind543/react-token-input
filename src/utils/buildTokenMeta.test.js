import buildTokenMeta from './buildTokenMeta.ts';
import {
  DEFAULT_VALUE_TYPE,
  OBJECT_VALUE_TYPE,
} from '../__fixtures__/tokens.fixtures';

const MOCK_TOKEN_INDEX = 0;

describe('buildTokenMeta() with default string type tokenValue', () => {
  describe('token without error', () => {
    const { tokenMeta } = DEFAULT_VALUE_TYPE.BASED;

    it('should return `tokenMeta`', () => {
      expect(
        buildTokenMeta({
          tokenMetaKey: tokenMeta.key,
          tokenIndex: MOCK_TOKEN_INDEX,
          customizeError: tokenMeta.error,
        })
      ).toEqual(tokenMeta);
    });
  });

  describe('token with error message', () => {
    const { tokenMeta } = DEFAULT_VALUE_TYPE.WITH_ERROR;

    it('should return `tokenMeta`', () => {
      expect(
        buildTokenMeta({
          tokenMetaKey: tokenMeta.key,
          tokenIndex: MOCK_TOKEN_INDEX,
          customizeError: tokenMeta.error,
        })
      ).toEqual(tokenMeta);
    });
  });

  describe('token with customize error', () => {
    const { tokenMeta } = DEFAULT_VALUE_TYPE.BOOLEAN_TYPE_ERROR;

    it('should return `tokenMeta`', () => {
      expect(
        buildTokenMeta({
          tokenMetaKey: tokenMeta.key,
          tokenIndex: MOCK_TOKEN_INDEX,
          customizeError: tokenMeta.error,
        })
      ).toEqual(tokenMeta);
    });
  });
});

describe('buildTokenMeta() with object type tokenValue', () => {
  describe('token without error', () => {
    const { tokenMeta } = OBJECT_VALUE_TYPE.BASED;

    it('should return `tokenMeta`', () => {
      expect(
        buildTokenMeta({
          tokenMetaKey: tokenMeta.key,
          tokenIndex: MOCK_TOKEN_INDEX,
          customizeError: tokenMeta.error,
        })
      ).toEqual(tokenMeta);
    });
  });

  describe('token with error message', () => {
    const { tokenMeta } = OBJECT_VALUE_TYPE.WITH_ERROR;

    it('should return `tokenMeta`', () => {
      expect(
        buildTokenMeta({
          tokenMetaKey: tokenMeta.key,
          tokenIndex: MOCK_TOKEN_INDEX,
          customizeError: tokenMeta.error,
        })
      ).toEqual(tokenMeta);
    });
  });

  describe('token with customize error', () => {
    const { tokenMeta } = OBJECT_VALUE_TYPE.OBJECT_TYPE_ERROR;

    it('should return `tokenMeta`', () => {
      expect(
        buildTokenMeta({
          tokenMetaKey: tokenMeta.key,
          tokenIndex: MOCK_TOKEN_INDEX,
          customizeError: tokenMeta.error,
        })
      ).toEqual(tokenMeta);
    });
  });
});
