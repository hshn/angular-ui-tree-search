export function defaultMatcherFactoryProvider () {

  let _property = 'title';
  this.setProperty = property => _property = property;

  this.$get = () => {
    return query => query == null
      ? node => true
      : node => (node[_property] || '').indexOf(query) > -1;
  }
}
