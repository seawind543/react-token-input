/**
 * @description
 * TokenInput default value type (string)
 */
export const DEFAULT_VALUE_TYPE = {
  BASED: {
    tokenValue: 'hello world',
    tokenMeta: {
      key: '"hello world"-1609556645000-0',
      index: 0,
      activated: false,
      error: undefined,
    },
  },

  ACTIVATED: {
    tokenValue: 'hello world',
    tokenMeta: {
      key: '"hello world"-1609556645000-0',
      index: 0,
      activated: true,
      error: undefined,
    },
  },

  WITH_ERROR: {
    tokenValue: 'hello world',
    tokenMeta: {
      key: '"hello world"-1609556645000-0',
      index: 0,
      activated: false,
      error: 'This is an invalid token',
    },
  },

  ACTIVATED_WITH_ERROR: {
    tokenValue: 'hello world',
    tokenMeta: {
      key: '"hello world"-1609556645000-0',
      index: 0,
      activated: true,
      error: 'This is an invalid token',
    },
  },

  BOOLEAN_TYPE_ERROR: {
    tokenValue: 'hello world',
    tokenMeta: {
      key: '"hello world"-1609556645000-0',
      index: 0,
      activated: false,
      error: true,
    },
  },
};

/**
 * @description
 * Number value type
 */
export const NUMBER_VALUE_TYPE = {
  BASED: {
    tokenValue: 123,
    tokenMeta: {
      key: '123-1609556645000-0',
      index: 0,
      activated: false,
      error: undefined,
    },
  },

  ACTIVATED: {
    tokenValue: 123,
    tokenMeta: {
      key: '123-1609556645000-0',
      index: 0,
      activated: true,
      error: undefined,
    },
  },

  WITH_ERROR: {
    tokenValue: 123,
    tokenMeta: {
      key: '123-1609556645000-0',
      index: 0,
      activated: false,
      error: 'This is an invalid token',
    },
  },

  ACTIVATED_WITH_ERROR: {
    tokenValue: 123,
    tokenMeta: {
      key: '123-1609556645000-0',
      index: 0,
      activated: true,
      error: 'This is an invalid token',
    },
  },
};

/**
 * @description
 * Object value type
 */
export const OBJECT_VALUE_TYPE = {
  BASED: {
    tokenValue: {
      number: 123,
    },
    tokenMeta: {
      key: '{"number":123}-1609556645000-0',
      index: 0,
      activated: false,
      error: null,
    },
  },

  ACTIVATED: {
    tokenValue: {
      number: 123,
    },
    tokenMeta: {
      key: '{"number":123}-1609556645000-0',
      index: 0,
      activated: true,
      error: null,
    },
  },

  WITH_ERROR: {
    tokenValue: {
      number: 123,
    },
    tokenMeta: {
      key: '{"number":123}-1609556645000-0',
      index: 0,
      activated: false,
      error: 'This is an invalid token',
    },
  },

  ACTIVATED_WITH_ERROR: {
    tokenValue: {
      number: 123,
    },
    tokenMeta: {
      key: '{"number":123}-1609556645000-0',
      index: 0,
      activated: true,
      error: 'This is an invalid token',
    },
  },

  OBJECT_TYPE_ERROR: {
    tokenValue: {
      number: 123,
    },
    tokenMeta: {
      key: '{"number":123}-1609556645000-0',
      index: 0,
      activated: false,
      error: {
        reason: 'Not weather',
        message: 'I am not weather',
      },
    },
  },
};
