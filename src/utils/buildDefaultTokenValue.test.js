import buildDefaultTokenValue from './buildDefaultTokenValue';

const TEST_DATA = [
  {
    inputValue: 'testString',
    tokenValue: 'testString',
  },
  {
    inputValue: ' testString ',
    tokenValue: 'testString',
  },
  {
    inputValue: ' test String ',
    tokenValue: 'test String',
  },
];

describe('buildDefaultTokenValue()', () => {
  it('should return trimmed `inputValue`', () => {
    TEST_DATA.forEach((testData) => {
      expect(buildDefaultTokenValue(testData.inputValue)).toBe(
        testData.tokenValue
      );
    });
  });
});
