import buildDefaultTokenValue from './buildDefaultTokenValue';
import MOCK_INPUT from '../__fixtures__/inputValues.fixtures';

describe('buildDefaultTokenValue()', () => {
  it('should return trimmed `inputValue`', () => {
    MOCK_INPUT.forEach((testData) => {
      expect(buildDefaultTokenValue(testData.inputValue)).toBe(
        testData.expectTokenValue
      );
    });
  });
});
