import { act } from 'react';
import { renderHook } from '@testing-library/react';
import useTokenInputFocusEffect from './useTokenInputFocusEffect.ts';

describe('useTokenInputFocusEffect()', () => {
  it('should return `isTokenInputFocused` and related handler', () => {
    const { result } = renderHook(() => useTokenInputFocusEffect({}));

    expect(result.current.isTokenInputFocused).toBe(false);
    expect(typeof result.current.handleTokenInputFocus).toBe('function');
    expect(typeof result.current.handleTokenInputBlur).toBe('function');
    expect(typeof result.current.handleCreatorFocus).toBe('function');
    expect(typeof result.current.handleCreatorBlur).toBe('function');
  });

  it('should return `handleTokenInputFocus`', () => {
    const { result } = renderHook(() => useTokenInputFocusEffect({}));

    expect(result.current.isTokenInputFocused).toBe(false);
    act(() => {
      result.current.handleTokenInputFocus();
    });
    expect(result.current.isTokenInputFocused).toBe(true);
  });

  it('should return `handleTokenInputBlur`', () => {
    const { result } = renderHook(() => useTokenInputFocusEffect({}));

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

  it('should return `handleCreatorFocus`', () => {
    const onCreatorFocus = jest.fn();
    const focusEvent = new FocusEvent('focus');

    const { result } = renderHook(() =>
      useTokenInputFocusEffect({
        onCreatorFocus,
      }),
    );

    expect(result.current.isTokenInputFocused).toBe(false);
    act(() => {
      result.current.handleCreatorFocus(focusEvent);
    });
    expect(onCreatorFocus).toHaveBeenCalledWith(focusEvent);
    expect(result.current.isTokenInputFocused).toBe(true);
  });

  it('should return `handleCreatorBlur`', () => {
    const onCreatorBlur = jest.fn();
    const focusEvent = new FocusEvent('blur');

    const { result } = renderHook(() =>
      useTokenInputFocusEffect({
        onCreatorBlur,
      }),
    );

    // init
    act(() => {
      result.current.handleTokenInputFocus();
    });

    // handle blurred
    act(() => {
      result.current.handleCreatorBlur(focusEvent);
    });
    expect(onCreatorBlur).toHaveBeenCalledWith(focusEvent);
    expect(result.current.isTokenInputFocused).toBe(false);
  });
});
