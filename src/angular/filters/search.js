searchFilter.$inject = ['ui.tree-search.search'];
export function searchFilter (search) {
  return (nodes, query) => search(nodes, query);
}

