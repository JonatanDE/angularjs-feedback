export default function () {
  var mock = document.createElement('ri-feedback-message');

  mock.api = {
    close: jasmine.createSpy('close'),
    sendTo: jasmine.createSpy('sendTo')
  };

  return angular.element(mock);
};
