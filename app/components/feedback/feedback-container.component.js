import controller from './feedback-container.controller';

export default {
  transclude: true,
  template: '<ng-transclude></ng-transclude>',
  controller: controller,
  controllerAs: 'ctrl'
};
