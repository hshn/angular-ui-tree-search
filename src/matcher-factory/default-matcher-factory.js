export function defaultMatcherFactory(properties, match) {
  return query => query == null
    ? node => true
    : node => properties.reduce((matched, property) => matched || match(node, property, query), false)
}
