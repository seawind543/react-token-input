import { renderHook, act } from '@testing-library/react-hooks';
import useTokenMetas from './useTokenMetas';

import DEFAULT_VALUE_TYPE_DATA from '../__fixtures__/tokenValues.fixtures';

jest.mock('../utils/buildTokenMeta', () => jest.fn());

describe('useTokenMetas() with default string type tokenValue', () => {
  it('should return `tokenMetas`, `setTokenMetas` and `setTokenActivated`', () => {
    const { result } = renderHook(() => useTokenMetas());

    expect(typeof result.current.buildTokenMeta).toBe('function');
    expect(result.current.tokenMetas).toEqual([]);
    expect(typeof result.current.setTokenMetas).toBe('function');
    expect(typeof result.current.setTokenActivated).toBe('function');
  });

  it('should return `setTokenMetas`', () => {
    const { result } = renderHook(() => useTokenMetas());

    expect(result.current.tokenMetas).toEqual([]);

    const { tokenMetas } = DEFAULT_VALUE_TYPE_DATA;
    act(() => {
      result.current.setTokenMetas(tokenMetas);
    });
    expect(result.current.tokenMetas).toEqual(tokenMetas);
  });

  it('should return `setTokenActivated`', () => {
    const { result } = renderHook(() => useTokenMetas());

    // init
    const { tokenMetas } = DEFAULT_VALUE_TYPE_DATA;
    act(() => {
      result.current.setTokenMetas(tokenMetas);
    });

    // Set the target one to activated
    const MOCK_TARGET_INDEX = 1;
    act(() => {
      result.current.setTokenActivated(MOCK_TARGET_INDEX, true);
    });

    result.current.tokenMetas.forEach((tokenMeta, idx) => {
      if (idx === MOCK_TARGET_INDEX) {
        // Target tokenMeta should be activated
        expect(tokenMeta).toEqual({
          ...tokenMetas[idx],
          activated: true,
        });
      } else {
        // Not target tokenMeta should not change
        expect(tokenMeta).toEqual(tokenMetas[idx]);
      }
    });
  });
});
