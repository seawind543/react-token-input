import { renderHook, act } from '@testing-library/react-hooks';
import useTokenInputFocus from './useTokenInputFocus';

describe('useTokenInputFocus()', () => {
  it('should return `isTokenInputFocused`, `handleTokenInputFocus` and `handleTokenInputBlur`', () => {
    const { result } = renderHook(() => useTokenInputFocus());

    expect(result.current.isTokenInputFocused).toBe(false);
    expect(typeof result.current.handleTokenInputFocus).toBe('function');
    expect(typeof result.current.handleTokenInputBlur).toBe('function');
  });

  it('should return `handleTokenInputFocus`', () => {
    const { result } = renderHook(() => useTokenInputFocus());

    expect(result.current.isTokenInputFocused).toBe(false);
    act(() => {
      result.current.handleTokenInputFocus();
    });
    expect(result.current.isTokenInputFocused).toBe(true);
  });

  it('should return `handleTokenInputBlur`', () => {
    const { result } = renderHook(() => useTokenInputFocus());

    // init
    act(() => {
      result.current.handleTokenInputFocus();
    });

    // handle blurred
    act(() => {
      result.current.handleTokenInputBlur();
    });
    expect(result.current.isTokenInputFocused).toBe(false);
  });
});
