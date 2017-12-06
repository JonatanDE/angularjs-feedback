import 'angular';
import 'angular-mocks/angular-mocks';

const context = require.context('./components', true, /\.spec\.js$/);

context.keys().forEach(context);
