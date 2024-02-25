import defaultGetTokenEditableValue from './defaultGetTokenEditableValue.ts';
import { DEFAULT_VALUE_TYPE } from '../__fixtures__/tokens.fixtures';

describe('defaultGetTokenEditableValue()', () => {
  it('should return `tokenValue` as `string` directly', () => {
    const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.BASED;

    expect(defaultGetTokenEditableValue(tokenValue, tokenMeta)).toBe(
      `${tokenValue}`,
    );
  });
});
