export default function () {
  var mock = document.createElement('ri-feedback-container');

  mock.api = {
    id: 123,
    empty: jasmine.createSpy('empty'),
    closeAll: jasmine.createSpy('closeAll')
  };

  return angular.element(mock);
};
