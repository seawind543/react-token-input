import buildTokenMeta from './buildTokenMeta';
import MOCK_DATA from '../__fixtures__/buildTokenMeta.fixtures';

describe('buildTokenMeta()', () => {
  it('should return tokenValue`', () => {
    MOCK_DATA.forEach((data) => {
      expect(
        buildTokenMeta(data.customizeError, data.tokenValue, data.tokenIndex)
      ).toEqual(data.expectMeta);
    });
  });
});
