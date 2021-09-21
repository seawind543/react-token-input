import { renderHook, act } from '@testing-library/react-hooks';
import useTokenMetas from './useTokenMetas';
// import buildTokenMeta from '../utils/buildTokenMeta';

import {
  DEFAULT_VALUE_TYPE,
  // OBJECT_VALUE_TYPE,
} from '../__fixtures__/tokens.fixtures';

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

    const MOCK_TOKEN_META = [DEFAULT_VALUE_TYPE.BASED.tokenMeta];
    act(() => {
      result.current.setTokenMetas(MOCK_TOKEN_META);
    });
    expect(result.current.tokenMetas).toEqual(MOCK_TOKEN_META);
  });

  it('should return `setTokenActivated`', () => {
    const { result } = renderHook(() => useTokenMetas());

    expect(result.current.tokenMetas).toEqual([]);

    const MOCK_TOKEN_META = [DEFAULT_VALUE_TYPE.BASED.tokenMeta];
    act(() => {
      result.current.setTokenMetas(MOCK_TOKEN_META);
    });
    expect(result.current.tokenMetas).toEqual(MOCK_TOKEN_META);

    const MOCK_INDEX = 0;
    act(() => {
      result.current.setTokenActivated(MOCK_INDEX, true);
    });
    expect(result.current.tokenMetas[MOCK_INDEX]).toEqual(
      DEFAULT_VALUE_TYPE.ACTIVATED.tokenMeta
    );
  });
});
