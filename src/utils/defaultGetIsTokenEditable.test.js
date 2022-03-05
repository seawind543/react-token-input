import defaultGetIsTokenEditable from './defaultGetIsTokenEditable.ts';

describe('defaultGetIsTokenEditable()', () => {
  it('should return `true` directly', () => {
    expect(defaultGetIsTokenEditable()).toBeTruthy();
  });
});
