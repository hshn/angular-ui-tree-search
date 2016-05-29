import { MatchVisitor } from '../../../src/traversal/visitor';

describe('MatchVisitorSpec', () => {
  describe('enterNode()', () => {
    it('should set $matched true if matched', () => {
      let visitor = new MatchVisitor(node => true);

      expect(visitor.enterNode({}).$matched).toBe(true);
    });

    it('should set $matched false if did not match', () => {
      let visitor = new MatchVisitor(node => false);

      expect(visitor.enterNode({}).$matched).toBe(false);
    });
  });
});
