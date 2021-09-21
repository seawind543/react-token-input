import buildTokenMeta from './buildTokenMeta';
import {
  DEFAULT_VALUE_TYPE,
  OBJECT_VALUE_TYPE,
} from '../__fixtures__/tokens.fixtures';

const MOCK_TOKEN_INDEX = 0;

describe('buildTokenMeta()', () => {
  describe('string type tokenValue', () => {
    describe('token without error', () => {
      const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.BASED;

      it('should return `tokenMeta`', () => {
        expect(
          buildTokenMeta(tokenMeta.error, tokenValue, MOCK_TOKEN_INDEX)
        ).toEqual(tokenMeta);
      });
    });

    describe('token with error message', () => {
      const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.WITH_ERROR;

      it('should return `tokenMeta`', () => {
        expect(
          buildTokenMeta(tokenMeta.error, tokenValue, MOCK_TOKEN_INDEX)
        ).toEqual(tokenMeta);
      });
    });

    describe('token with customize error', () => {
      const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.BOOLEAN_TYPE_ERROR;

      it('should return `tokenMeta`', () => {
        expect(
          buildTokenMeta(tokenMeta.error, tokenValue, MOCK_TOKEN_INDEX)
        ).toEqual(tokenMeta);
      });
    });
  });

  describe('object type tokenValue', () => {
    describe('token without error', () => {
      const { tokenValue, tokenMeta } = OBJECT_VALUE_TYPE.BASED;

      it('should return `tokenMeta`', () => {
        expect(
          buildTokenMeta(tokenMeta.error, tokenValue, MOCK_TOKEN_INDEX)
        ).toEqual(tokenMeta);
      });
    });

    describe('token with error message', () => {
      const { tokenValue, tokenMeta } = OBJECT_VALUE_TYPE.WITH_ERROR;

      it('should return `tokenMeta`', () => {
        expect(
          buildTokenMeta(tokenMeta.error, tokenValue, MOCK_TOKEN_INDEX)
        ).toEqual(tokenMeta);
      });
    });

    describe('token with customize error', () => {
      const { tokenValue, tokenMeta } = OBJECT_VALUE_TYPE.OBJECT_TYPE_ERROR;

      it('should return `tokenMeta`', () => {
        expect(
          buildTokenMeta(tokenMeta.error, tokenValue, MOCK_TOKEN_INDEX)
        ).toEqual(tokenMeta);
      });
    });
  });
});
