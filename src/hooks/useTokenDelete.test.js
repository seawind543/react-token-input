import { renderHook } from '@testing-library/react';
import useTokenDelete from './useTokenDelete.ts';

import DEFAULT_VALUE_TYPE_DATA from '../__fixtures__/tokenValues.fixtures';

describe('useTokenDelete() with default string type tokenValue', () => {
  it('should return `handleTokenDelete`', () => {
    const { tokenValues } = DEFAULT_VALUE_TYPE_DATA;
    const onTokenValuesChange = jest.fn();
    const focusTokenCreator = jest.fn();
    const { result } = renderHook(() =>
      useTokenDelete({
        tokenValues,
        onTokenValuesChange,
        focusTokenCreator,
      }),
    );

    expect(typeof result.current.handleTokenDelete).toBe('function');

    // Delete the target one
    const MOCK_TARGET_INDEX = 2;
    result.current.handleTokenDelete(MOCK_TARGET_INDEX)();

    const newTokenValues = [...tokenValues];
    newTokenValues.splice(MOCK_TARGET_INDEX, 1);
    expect(onTokenValuesChange).toBeCalledTimes(1);
    expect(onTokenValuesChange).toBeCalledWith(newTokenValues);

    expect(focusTokenCreator).toBeCalledTimes(1);
  });
});
