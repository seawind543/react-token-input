import getDefaultTokenEditableValue from './getDefaultTokenEditableValue.ts';
import { DEFAULT_VALUE_TYPE } from '../__fixtures__/tokens.fixtures';

describe('getDefaultTokenEditableValue()', () => {
  it('should return `tokenValue` directly', () => {
    const { tokenValue, tokenMeta } = DEFAULT_VALUE_TYPE.BASED;

    expect(getDefaultTokenEditableValue(tokenValue, tokenMeta)).toBe(
      tokenValue
    );
  });
});
