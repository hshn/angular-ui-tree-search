import { defaultMatcherFactory } from '../../matcher-factory/default-matcher-factory';

export function defaultMatcherFactoryProvider () {

  let _properties = ['title'];
  let _match = (node, property, query) => (node[property] || '').indexOf(query) > -1;

  this.setProperties = properties => _properties = properties;

  this.$get = () => {
    return defaultMatcherFactory(_properties, _match);
  }
}
