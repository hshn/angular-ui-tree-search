searchFilter.$inject = ['uitsSearch'];
export function searchFilter (search) {
  return (nodes, query) => search(nodes, query);
}

