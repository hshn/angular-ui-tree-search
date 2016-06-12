import { matcherFactory } from '../../src/matcher-factory/matcher-factory';

describe('default-matcher-factory', () => {

  let matcher;
  beforeEach(() => {
    matcher = matcherFactory(['foo', 'bar'], (node, property, query) => node[property] === query);
  });

  it('should match with `foo` attribute', () => {
    expect(matcher('baz')({foo: 'baz'})).toBe(true);
  });

  it('should match with `bar` attribute', () => {
    expect(matcher('baz')({bar: 'baz'})).toBe(true);
  });

  it('should not match with any attributes', () => {
    expect(matcher('foo')({foo: 'baz', bar: 'baz'})).toBe(false);
  });
});
