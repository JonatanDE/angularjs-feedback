require('./styles.scss');

import 'font-awesome/scss/font-awesome.scss';
import angular from 'angular';
import feedback from './components/feedback/feedback.module';
import main from './view/main';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [feedback])
  .component('app', main);

export default MODULE_NAME;