import keyDownKey from 'keydown-key';
import keyDownHandlerProxy from './keyDownHandlerProxy.ts';

jest.mock('keydown-key');

describe('keyDownHandlerProxy()', () => {
  const MOCK_KEY_DONE_EVENT = {
    key: 'MOCK',
  };
  const MOCK_ACTIONS = {
    onBackspace: jest.fn(),
    onTab: jest.fn(),
    onEnter: jest.fn(),
    onEscape: jest.fn(),
  };

  describe('KeyDone on `Backspace`', () => {
    beforeEach(() => {
      keyDownKey.mockReturnValue({
        key: 'Backspace',
      });
    });

    it('should execute onBackspace()', () => {
      keyDownHandlerProxy(MOCK_KEY_DONE_EVENT, MOCK_ACTIONS);

      expect(MOCK_ACTIONS.onBackspace).toHaveBeenCalledWith(
        MOCK_KEY_DONE_EVENT,
      );
      expect(MOCK_ACTIONS.onBackspace).toHaveBeenCalledTimes(1);
    });
  });

  describe('KeyDone on `Tab`', () => {
    beforeEach(() => {
      keyDownKey.mockReturnValue({
        key: 'Tab',
      });
    });

    it('should execute onTab()', () => {
      keyDownHandlerProxy(MOCK_KEY_DONE_EVENT, MOCK_ACTIONS);

      expect(MOCK_ACTIONS.onTab).toHaveBeenCalledWith(MOCK_KEY_DONE_EVENT);
      expect(MOCK_ACTIONS.onTab).toHaveBeenCalledTimes(1);
    });
  });

  describe('KeyDone on `Enter`', () => {
    beforeEach(() => {
      keyDownKey.mockReturnValue({
        key: 'Enter',
      });
    });

    it('should execute onEnter()', () => {
      keyDownHandlerProxy(MOCK_KEY_DONE_EVENT, MOCK_ACTIONS);

      expect(MOCK_ACTIONS.onEnter).toHaveBeenCalledWith(MOCK_KEY_DONE_EVENT);
      expect(MOCK_ACTIONS.onEnter).toHaveBeenCalledTimes(1);
    });
  });

  describe('KeyDone on `Escape`', () => {
    beforeEach(() => {
      keyDownKey.mockReturnValue({
        key: 'Escape',
      });
    });

    it('should execute onEnter()', () => {
      keyDownHandlerProxy(MOCK_KEY_DONE_EVENT, MOCK_ACTIONS);

      expect(MOCK_ACTIONS.onEscape).toHaveBeenCalledWith(MOCK_KEY_DONE_EVENT);
      expect(MOCK_ACTIONS.onEscape).toHaveBeenCalledTimes(1);
    });
  });
});
