import defaultBuildTokenValue from './defaultBuildTokenValue.ts';
import MOCK_INPUT from '../__fixtures__/inputValues.fixtures';

describe('defaultBuildTokenValue()', () => {
  it('should return trimmed `inputValue`', () => {
    MOCK_INPUT.forEach((testData) => {
      expect(defaultBuildTokenValue(testData.inputValue)).toBe(
        testData.expectTokenValue
      );
    });
  });
});
