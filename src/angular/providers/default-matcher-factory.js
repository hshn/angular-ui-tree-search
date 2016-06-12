import { defaultMatcherFactory } from '../../matcher-factory/default-factory';

export function defaultMatcherFactoryProvider () {

  let _property = 'title';
  this.setProperty = property => _property = property;

  this.$get = () => defaultMatcherFactory(_property);
}
