import { renderHook } from '@testing-library/react-hooks';
import usePredefinedKeyDownHandlers from './usePredefinedKeyDownHandlers.ts';
import {
  KEY_DOWN_HANDLER_CONFIG_OPTION,
  DEFAULT_SPECIAL_KEY_DOWN_CONFIG,
} from '../constants.ts';

const INPUT_INIT_VALUE = 'INPUT_INIT_VALUE';
const KEY_DOWN_EVENT = { key: 'the key', preventDefault: jest.fn() };

describe('usePredefinedKeyDownHandlers() default setting', () => {
  it('should return `handleBackspaceKeyDown`, `handleTabKeyDown`, `handleEnterKeyDown` and `handleEscapeKeyDown`', () => {
    const specialKeyDownConfig = DEFAULT_SPECIAL_KEY_DOWN_CONFIG;
    const inputInitValue = INPUT_INIT_VALUE;
    const inputValue = 'hello world';
    const onLastTokenDelete = jest.fn();
    const handleInputValueUpdate = jest.fn();
    const handleTokensCreate = jest.fn();

    const { result } = renderHook(() =>
      usePredefinedKeyDownHandlers({
        specialKeyDownConfig,
        inputInitValue,
        inputValue,
        onLastTokenDelete,
        handleInputValueUpdate,
        handleTokensCreate,
      }),
    );

    expect(typeof result.current.handleBackspaceKeyDown).toBe('function');
    expect(typeof result.current.handleTabKeyDown).toBe('function');
    expect(typeof result.current.handleEnterKeyDown).toBe('function');
    expect(typeof result.current.handleEscapeKeyDown).toBe('function');
  });

  it('should return `handleBackspaceKeyDown`', () => {
    const specialKeyDownConfig = DEFAULT_SPECIAL_KEY_DOWN_CONFIG;
    const inputInitValue = INPUT_INIT_VALUE;
    const inputValue = 'hello world';
    const emptyInputValue = '';
    const onLastTokenDelete = jest.fn();
    const handleInputValueUpdate = jest.fn();
    const handleTokensCreate = jest.fn();

    const { result } = renderHook(() =>
      usePredefinedKeyDownHandlers({
        specialKeyDownConfig,
        inputInitValue,
        inputValue,
        onLastTokenDelete,
        handleInputValueUpdate,
        handleTokensCreate,
      }),
    );

    expect(typeof result.current.handleBackspaceKeyDown).toBe('function');
    result.current.handleBackspaceKeyDown(KEY_DOWN_EVENT);
    expect(onLastTokenDelete).not.toBeCalled();

    const { result: emptyInputValueResult } = renderHook(() =>
      usePredefinedKeyDownHandlers({
        specialKeyDownConfig,
        inputInitValue,
        inputValue: emptyInputValue,
        onLastTokenDelete,
        handleInputValueUpdate,
        handleTokensCreate,
      }),
    );
    expect(typeof emptyInputValueResult.current.handleBackspaceKeyDown).toBe(
      'function',
    );
    emptyInputValueResult.current.handleBackspaceKeyDown(KEY_DOWN_EVENT);
    expect(onLastTokenDelete).toBeCalledTimes(1);
  });

  it('should return `handleTabKeyDown`', () => {
    const specialKeyDownConfig = DEFAULT_SPECIAL_KEY_DOWN_CONFIG;
    const inputInitValue = INPUT_INIT_VALUE;
    const inputValue = 'hello world';
    const onLastTokenDelete = jest.fn();
    const handleInputValueUpdate = jest.fn();
    const handleTokensCreate = jest.fn();

    const { result } = renderHook(() =>
      usePredefinedKeyDownHandlers({
        specialKeyDownConfig,
        inputInitValue,
        inputValue,
        onLastTokenDelete,
        handleInputValueUpdate,
        handleTokensCreate,
      }),
    );

    expect(typeof result.current.handleTabKeyDown).toBe('function');
    result.current.handleTabKeyDown(KEY_DOWN_EVENT);
    expect(KEY_DOWN_EVENT.preventDefault).not.toBeCalled();
    expect(handleTokensCreate).not.toBeCalled();
  });

  it('should return `handleEnterKeyDown`', () => {
    const specialKeyDownConfig = DEFAULT_SPECIAL_KEY_DOWN_CONFIG;
    const inputInitValue = INPUT_INIT_VALUE;
    const inputValue = 'hello world';
    const onLastTokenDelete = jest.fn();
    const handleInputValueUpdate = jest.fn();
    const handleTokensCreate = jest.fn();

    const { result } = renderHook(() =>
      usePredefinedKeyDownHandlers({
        specialKeyDownConfig,
        inputInitValue,
        inputValue,
        onLastTokenDelete,
        handleInputValueUpdate,
        handleTokensCreate,
      }),
    );

    expect(typeof result.current.handleEnterKeyDown).toBe('function');
    result.current.handleEnterKeyDown(KEY_DOWN_EVENT);
    expect(handleTokensCreate).toBeCalledTimes(1);
    expect(handleTokensCreate).toBeCalledWith(inputValue);
  });

  it('should return `handleEscapeKeyDown`', () => {
    const specialKeyDownConfig = DEFAULT_SPECIAL_KEY_DOWN_CONFIG;
    const inputInitValue = INPUT_INIT_VALUE;
    const inputValue = 'hello world';
    const onLastTokenDelete = jest.fn();
    const handleInputValueUpdate = jest.fn();
    const handleTokensCreate = jest.fn();

    const { result } = renderHook(() =>
      usePredefinedKeyDownHandlers({
        specialKeyDownConfig,
        inputInitValue,
        inputValue,
        onLastTokenDelete,
        handleInputValueUpdate,
        handleTokensCreate,
      }),
    );

    expect(typeof result.current.handleEscapeKeyDown).toBe('function');
    result.current.handleEscapeKeyDown(KEY_DOWN_EVENT);
    expect(handleInputValueUpdate).toBeCalledTimes(1);
    expect(handleInputValueUpdate).toBeCalledWith(inputInitValue);
  });
});

describe('usePredefinedKeyDownHandlers().handleBackspaceKeyDown()', () => {
  describe('Mode: onBackspace === KEY_DOWN_HANDLER_CONFIG_OPTION.ON', () => {
    it('should return `handleBackspaceKeyDown`', () => {
      const specialKeyDownConfig = {};
      const inputInitValue = INPUT_INIT_VALUE;
      const inputValue = 'hello world';
      const emptyInputValue = '';
      const onLastTokenDelete = jest.fn();
      const handleInputValueUpdate = jest.fn();
      const handleTokensCreate = jest.fn();

      const { result } = renderHook(() =>
        usePredefinedKeyDownHandlers({
          specialKeyDownConfig,
          inputInitValue,
          inputValue,
          onLastTokenDelete,
          handleInputValueUpdate,
          handleTokensCreate,
        }),
      );

      expect(typeof result.current.handleBackspaceKeyDown).toBe('function');
      result.current.handleBackspaceKeyDown(KEY_DOWN_EVENT);
      expect(onLastTokenDelete).not.toBeCalled();

      const { result: emptyInputValueResult } = renderHook(() =>
        usePredefinedKeyDownHandlers({
          specialKeyDownConfig,
          inputInitValue,
          inputValue: emptyInputValue,
          onLastTokenDelete,
          handleInputValueUpdate,
          handleTokensCreate,
        }),
      );
      expect(typeof emptyInputValueResult.current.handleBackspaceKeyDown).toBe(
        'function',
      );
      emptyInputValueResult.current.handleBackspaceKeyDown(KEY_DOWN_EVENT);
      expect(onLastTokenDelete).toBeCalledTimes(1);
    });
  });

  describe('Mode: onBackspace === KEY_DOWN_HANDLER_CONFIG_OPTION.OFF', () => {
    const specialKeyDownConfig = {
      onBackspace: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
    };

    it('should return `handleBackspaceKeyDown` as dummy', () => {
      const inputInitValue = INPUT_INIT_VALUE;
      const emptyInputValue = '';
      const onLastTokenDelete = jest.fn();
      const handleInputValueUpdate = jest.fn();
      const handleTokensCreate = jest.fn();

      const { result } = renderHook(() =>
        usePredefinedKeyDownHandlers({
          specialKeyDownConfig,
          inputInitValue,
          inputValue: emptyInputValue,
          onLastTokenDelete,
          handleInputValueUpdate,
          handleTokensCreate,
        }),
      );
      expect(typeof result.current.handleBackspaceKeyDown).toBe('function');
      result.current.handleBackspaceKeyDown(KEY_DOWN_EVENT);
      expect(onLastTokenDelete).not.toBeCalled();
    });
  });
});

describe('usePredefinedKeyDownHandlers().handleTabKeyDown()', () => {
  describe('Mode: onTab === KEY_DOWN_HANDLER_CONFIG_OPTION.OFF', () => {
    it('should return `handleTabKeyDown` as dummy', () => {
      const specialKeyDownConfig = DEFAULT_SPECIAL_KEY_DOWN_CONFIG;
      const inputInitValue = INPUT_INIT_VALUE;
      const inputValue = 'hello world';
      const onLastTokenDelete = jest.fn();
      const handleInputValueUpdate = jest.fn();
      const handleTokensCreate = jest.fn();

      const { result } = renderHook(() =>
        usePredefinedKeyDownHandlers({
          specialKeyDownConfig,
          inputInitValue,
          inputValue,
          onLastTokenDelete,
          handleInputValueUpdate,
          handleTokensCreate,
        }),
      );

      expect(typeof result.current.handleTabKeyDown).toBe('function');
      result.current.handleTabKeyDown(KEY_DOWN_EVENT);
      expect(KEY_DOWN_EVENT.preventDefault).not.toBeCalled();
      expect(handleTokensCreate).not.toBeCalled();
    });
  });

  describe('Mode: onTab === KEY_DOWN_HANDLER_CONFIG_OPTION.ON', () => {
    it('should return `handleTabKeyDown`', () => {
      const specialKeyDownConfig = { onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.ON };
      const inputInitValue = INPUT_INIT_VALUE;
      const inputValue = 'hello world';
      const onLastTokenDelete = jest.fn();
      const handleInputValueUpdate = jest.fn();
      const handleTokensCreate = jest.fn();

      const { result } = renderHook(() =>
        usePredefinedKeyDownHandlers({
          specialKeyDownConfig,
          inputInitValue,
          inputValue,
          onLastTokenDelete,
          handleInputValueUpdate,
          handleTokensCreate,
        }),
      );

      expect(typeof result.current.handleTabKeyDown).toBe('function');
      result.current.handleTabKeyDown(KEY_DOWN_EVENT);
      expect(KEY_DOWN_EVENT.preventDefault).toBeCalledTimes(1);
      expect(handleTokensCreate).toBeCalledTimes(1);
      expect(handleTokensCreate).toBeCalledWith(inputValue);
    });
  });
});
