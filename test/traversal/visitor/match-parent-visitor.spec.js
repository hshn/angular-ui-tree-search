import { MatchParentVisitor } from '../../../src/traversal/visitor/match-parent-visitor';

describe('MatchParentVisitor', () => {
  describe('leaveNode()', () => {
    let visitor;
    beforeEach(() => {
      visitor = new MatchParentVisitor();
      visitor.enterNode({$matched: false});
      visitor.enterNode({$matched: false});
      visitor.enterNode({$matched: true});
      visitor.enterNode({$matched: false});
    });

    it('should mark all parent nodes as matched if matched', () => {
      visitor.leaveNode({$matched: true});
      expect(visitor.stack.map(node => node.$matched)).toEqual([true, true, true]);
    });

    it('should not mark parent nodes as matched if dit not match', () => {
        visitor.leaveNode({$matched: false});
        expect(visitor.stack.map(node => node.$matched)).toEqual([false, false, true]);
    });
  });
});
