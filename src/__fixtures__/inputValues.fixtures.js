const MOCK_INPUT = [
  {
    inputValue: 'testString',
    expectTokenValue: 'testString',
  },
  {
    inputValue: ' testString ',
    expectTokenValue: 'testString',
  },
  {
    inputValue: ' test String ',
    expectTokenValue: 'test String',
  },
  {
    inputValue: '123',
    expectTokenValue: '123',
  },
];

export default MOCK_INPUT;
