beforeEach(() => {
  jasmine.addMatchers({
    toBeNode: function(util, customEqualityTesters) {

      function stringifyNode(node) {
        return `node(title = "${node.title}", $matched = ${node.$matched}`;
      }

      return {
        compare: function (actual, expected) {
          let result = {};

          result.pass = util.equals(actual.title, expected.title, customEqualityTesters)
                     && util.equals(actual.$matched, expected.$matched, customEqualityTesters);

          if (result.pass) {
            result.message = `Expected ${stringifyNode(actual)} not to be ${stringifyNode(expected)}`;
          } else {
            result.message = `Expected ${stringifyNode(actual)} to be ${stringifyNode(expected)}`;
          }

          return result;
        }
      };
    }
  });
});
