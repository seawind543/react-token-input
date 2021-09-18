const MOCK_DATA = [
  {
    customizeError: undefined,
    tokenValue: 'hello',
    tokenIndex: 0,
    expectMeta: {
      key: '"hello"-1609556645000-0',
      activated: false,
      error: undefined,
    },
  },
  {
    customizeError: undefined,
    tokenValue: 'world',
    tokenIndex: 1,
    expectMeta: {
      key: '"world"-1609556645000-1',
      activated: false,
      error: undefined,
    },
  },
  {
    customizeError: undefined,
    tokenValue: 'test case',
    tokenIndex: 2,
    expectMeta: {
      key: '"test case"-1609556645000-2',
      activated: false,
      error: undefined,
    },
  },
  {
    customizeError: undefined,
    tokenValue: 'xyz',
    tokenIndex: 3,
    expectMeta: {
      key: '"xyz"-1609556645000-3',
      activated: false,
      error: undefined,
    },
  },
  {
    customizeError: 'This is an invalid token',
    tokenValue: 'invalid',
    tokenIndex: 4,
    expectMeta: {
      key: '"invalid"-1609556645000-4',
      activated: false,
      error: 'This is an invalid token',
    },
  },
];

export default MOCK_DATA;
