export function defaultMatcherFactory(property) {
  return query => query == null
    ? node => true
    : node => (node[property] || '').indexOf(query) > -1;
}
