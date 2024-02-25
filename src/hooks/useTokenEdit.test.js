import { renderHook } from '@testing-library/react-hooks';
import useTokenEdit from './useTokenEdit.ts';

import DEFAULT_VALUE_TYPE_DATA from '../__fixtures__/tokenValues.fixtures';

describe('useTokenEdit() with default string type tokenValue', () => {
  describe('handleTokenEditStart()', () => {
    it('should set target token `activated` and focus on inline Input of the the token', () => {
      const { tokenValues } = DEFAULT_VALUE_TYPE_DATA;
      const onTokenValuesChange = jest.fn();
      const setTokenActivated = jest.fn();
      const handleTokenInputFocus = jest.fn();
      const handleTokenInputBlur = jest.fn();

      const { result } = renderHook(() =>
        useTokenEdit({
          tokenValues,
          onTokenValuesChange,
          setTokenActivated,
          handleTokenInputFocus,
          handleTokenInputBlur,
        }),
      );

      expect(typeof result.current.handleTokenEditStart).toBe('function');

      // Target one to be edit
      const MOCK_TARGET_INDEX = 2;
      result.current.handleTokenEditStart(MOCK_TARGET_INDEX)();

      expect(setTokenActivated).toBeCalledTimes(1);
      expect(setTokenActivated).toBeCalledWith(MOCK_TARGET_INDEX, true);

      expect(handleTokenInputFocus).toBeCalledTimes(1);

      expect(onTokenValuesChange).not.toBeCalled();
      expect(handleTokenInputBlur).not.toBeCalled();
    });
  });

  describe('handleTokenEditEnd()', () => {
    it('should set target token NOT `activated` and focus on tokenCreator', () => {
      const { tokenValues } = DEFAULT_VALUE_TYPE_DATA;
      const onTokenValuesChange = jest.fn();
      const setTokenActivated = jest.fn();
      const handleTokenInputFocus = jest.fn();
      const handleTokenInputBlur = jest.fn();

      const { result } = renderHook(() =>
        useTokenEdit({
          tokenValues,
          onTokenValuesChange,
          setTokenActivated,
          handleTokenInputFocus,
          handleTokenInputBlur,
        }),
      );

      expect(typeof result.current.handleTokenEditEnd).toBe('function');

      // Target one to be end edit
      const MOCK_TARGET_INDEX = 2;
      result.current.handleTokenEditEnd(MOCK_TARGET_INDEX)();

      expect(setTokenActivated).toBeCalledTimes(1);
      expect(setTokenActivated).toBeCalledWith(MOCK_TARGET_INDEX, false);

      expect(handleTokenInputBlur).toBeCalledTimes(1);
      expect(onTokenValuesChange).not.toBeCalled();
    });

    it('should update tokenValues when `handleTokenEditEnd` provide new value', () => {
      const { tokenValues } = DEFAULT_VALUE_TYPE_DATA;
      const onTokenValuesChange = jest.fn();
      const setTokenActivated = jest.fn();
      const handleTokenInputFocus = jest.fn();
      const handleTokenInputBlur = jest.fn();

      const { result } = renderHook(() =>
        useTokenEdit({
          tokenValues,
          onTokenValuesChange,
          setTokenActivated,
          handleTokenInputFocus,
          handleTokenInputBlur,
        }),
      );

      expect(typeof result.current.handleTokenEditEnd).toBe('function');

      // Target one to be end edit
      const MOCK_TARGET_INDEX = 2;
      const NEW_TOKEN_VALUE = 'new value';
      result.current.handleTokenEditEnd(MOCK_TARGET_INDEX)(NEW_TOKEN_VALUE);

      expect(setTokenActivated).toBeCalledTimes(1);
      expect(setTokenActivated).toBeCalledWith(MOCK_TARGET_INDEX, false);

      expect(handleTokenInputBlur).toBeCalledTimes(1);

      const modifiedTokenValues = [...tokenValues];
      modifiedTokenValues[MOCK_TARGET_INDEX] = NEW_TOKEN_VALUE;
      expect(onTokenValuesChange).toBeCalledTimes(1);
      expect(onTokenValuesChange).toBeCalledWith(modifiedTokenValues);
    });
  });
});
