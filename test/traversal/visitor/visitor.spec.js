import { Visitor } from '../../../src/traversal/visitor/visitor';

describe('visitor', () => {
  let visitor;
  beforeEach(() => {
    visitor = new Visitor();
  });

  describe('enterNode()', () => {
    it('should push a node to the stack', () => {
      expect(visitor.stack.length).toBe(0);

      visitor.enterNode({});
      expect(visitor.stack.length).toBe(1);

      visitor.enterNode({});
      expect(visitor.stack.length).toBe(2);
    });
  });

  describe('leaveNode()', () => {
    it('should pop a node from the stack', () => {
      visitor.enterNode({});
      visitor.enterNode({});
      expect(visitor.stack.length).toBe(2);

      visitor.leaveNode({});
      expect(visitor.stack.length).toBe(1);

      visitor.leaveNode({});
      expect(visitor.stack.length).toBe(0);
    });
  });
});
