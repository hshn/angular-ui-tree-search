import { MatchChildrenVisitor } from '../../../src/traversal/visitor/match-children-visitor';

describe('MatchChildrenVisitor', () => {
  let visitor;
  beforeEach(() => {
    visitor = new MatchChildrenVisitor();
  });

  it('should mark children as matched if its parent mached', () => {
    visitor.enterNode({$matched: false});
    visitor.enterNode({$matched: true});
    visitor.enterNode({$matched: false});

    expect(visitor.stack.map(node => node.$matched)).toEqual([false, true, true]);
  });

  it('should stop marking as matched if leave the matched node', () => {
    let nodes = [
      {$matched: true},
      {$matched: false},
          {$matched: true},
    ];

    visitor.enterNode(nodes[0]);
    expect(visitor.stack[0].$matched).toBe(true);

    visitor.leaveNode(nodes[0]);
    visitor.enterNode(nodes[1]);
    visitor.enterNode(nodes[2]);
    expect(visitor.stack.map(node => node.$matched)).toEqual([false, true]);
  });
});
