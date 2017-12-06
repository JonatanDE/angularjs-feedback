import controller from './feedback-message.controller';

export default {
  transclude: true,
  template: require('./template/feedback-message.html'),
  controller: controller,
  controllerAs: 'ctrl'
};
