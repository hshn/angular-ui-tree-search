import { Traverser } from '../../src/traversal/traverser';

describe('Traverser', () => {
  it('should traverse with visitors', () => {
    let visitor1, visitor2;
    let traverser = new Traverser(node => node.children || [], [
      visitor1 = jasmine.createSpyObj('visitor1', ['enterNode', 'leaveNode']),
      visitor2 = jasmine.createSpyObj('visitor2', ['enterNode', 'leaveNode']),
    ]);

    visitor1.enterNode.and.callFake(node => node);
    visitor1.leaveNode.and.callFake(node => node);
    visitor2.enterNode.and.callFake(node => node);
    visitor2.leaveNode.and.callFake(node => node);

    let node = {
      name: '1',
      children: [{
        name: '1-1'
      }, {
        name: '1-2',
        children: [{
          name: '1-2-1'
        }]
      }]
    };

    traverser.traverse(node);

    expect(visitor1.enterNode).toHaveBeenCalledWith(node);
    expect(visitor1.enterNode).toHaveBeenCalledWith(node.children[0]);
    expect(visitor1.enterNode).toHaveBeenCalledWith(node.children[1]);
    expect(visitor1.enterNode).toHaveBeenCalledWith(node.children[1].children[0]);
    expect(visitor1.leaveNode).toHaveBeenCalledWith(node.children[1].children[0]);
    expect(visitor1.leaveNode).toHaveBeenCalledWith(node.children[1]);
    expect(visitor1.leaveNode).toHaveBeenCalledWith(node.children[0]);
    expect(visitor1.leaveNode).toHaveBeenCalledWith(node);

    expect(visitor2.enterNode).toHaveBeenCalledWith(node);
    expect(visitor2.enterNode).toHaveBeenCalledWith(node.children[0]);
    expect(visitor2.enterNode).toHaveBeenCalledWith(node.children[1]);
    expect(visitor2.enterNode).toHaveBeenCalledWith(node.children[1].children[0]);
    expect(visitor2.leaveNode).toHaveBeenCalledWith(node.children[1].children[0]);
    expect(visitor2.leaveNode).toHaveBeenCalledWith(node.children[1]);
    expect(visitor2.leaveNode).toHaveBeenCalledWith(node.children[0]);
    expect(visitor2.leaveNode).toHaveBeenCalledWith(node);
  });
});
