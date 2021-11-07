import keyDownKey from 'keydown-key';
import keyDownHandlerProxy from './keyDownHandlerProxy';

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

      expect(MOCK_ACTIONS.onBackspace).toBeCalledWith(MOCK_KEY_DONE_EVENT);
      expect(MOCK_ACTIONS.onBackspace).toBeCalledTimes(1);
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

      expect(MOCK_ACTIONS.onTab).toBeCalledWith(MOCK_KEY_DONE_EVENT);
      expect(MOCK_ACTIONS.onTab).toBeCalledTimes(1);
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

      expect(MOCK_ACTIONS.onEnter).toBeCalledWith(MOCK_KEY_DONE_EVENT);
      expect(MOCK_ACTIONS.onEnter).toBeCalledTimes(1);
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

      expect(MOCK_ACTIONS.onEscape).toBeCalledWith(MOCK_KEY_DONE_EVENT);
      expect(MOCK_ACTIONS.onEscape).toBeCalledTimes(1);
    });
  });
});
