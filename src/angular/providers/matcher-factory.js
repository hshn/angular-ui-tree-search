import { matcherFactory } from '../../matcher-factory/matcher-factory';

export function matcherFactoryProvider () {

  let _properties = ['title'];
  let _match = (node, property, query) => (node[property] || '').indexOf(query) > -1;

  this.setProperties = properties => _properties = properties;

  this.$get = () => {
    return matcherFactory(_properties, _match);
  }
}
