require('./style/style.scss');

import angular from 'angular';
import provider from './feedback.provider';
import service from './feedback.service';
import factory from './feedback.factory';
import container from './feedback-container.component';
import message from './feedback-message.component';

const MODULE_NAME = 'feddback';

angular.module(MODULE_NAME, [])
  .provider('feedbackProvider', provider)
  .service('feedbackService', service)
  .service('feedbackFactory', factory)
  .component('riFeedbackContainer', container)
  .component('riFeedbackMessage', message);

export default MODULE_NAME;
