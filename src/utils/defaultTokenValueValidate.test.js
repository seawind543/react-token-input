import defaultTokenValueValidate from './defaultTokenValueValidate.ts';

describe('defaultTokenValueValidate()', () => {
  it('should return `undefined` directly', () => {
    expect(defaultTokenValueValidate()).toBeUndefined();
  });
});
