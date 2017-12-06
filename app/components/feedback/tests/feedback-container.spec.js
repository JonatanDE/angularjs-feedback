import feedback from '../feedback.module';
import ServiceMock from './mocks/service.mock';
import MessageMock from './mocks/message.mock';

describe('container.ctrl.js', () => {
  let $compile;
  let $controller;
  let $element;
  let $scope;
  let message;
  let service;

  const id = 'foo';

  const mock = {
    message: MessageMock,
    service: ServiceMock
  };

  beforeEach(() => {
    $controller = {};

    angular.mock.module(feedback, ($provide) => {
      $provide.value('feedbackService', new mock.service());
    });

    inject((_$rootScope_, _$compile_, feedbackService) => {
      $element = angular.element('<ri-feedback-container>');
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
      service = feedbackService;
      message = new mock.message();
    });
  });


  let _compile = () => {
    $compile($element)($scope);
    $scope.$digest();
    $controller = $element.controller('riFeedbackContainer');
  }

  it('should expose an api property on the element', () => {
    _compile();
    expect($element[0].api).toBe($controller);
  });

  it('should set feedbackId if one is supplied', () => {
    $element.attr('feedback-id', id);
    _compile();
    expect($controller._id).toBe(id);
  });

  it('should set feedbackId if one not supplied', () => {
    _compile();
    expect($controller._id).toBeTruthy();
  });

  it('should register container with feedbackService', () => {
    $element.attr('feedback-id', id);
    _compile();
    expect(service.registerContainer).toHaveBeenCalledWith(id, $element);
  });

  it('should trigger close on all messages via closeAll()', () => {
    $element.attr('feedback-id', id);
    _compile();

    let msg1 = new mock.message();
    let msg2 = new mock.message();
    let msg3 = new mock.message();

    // intentionally not append msg3
    $element.append(msg1).append(msg2);
    $controller.closeAll();

    expect(msg1[0].api.close).toHaveBeenCalled();
    expect(msg2[0].api.close).toHaveBeenCalled();
    expect(msg3[0].api.close).not.toHaveBeenCalled();
  });

  it('should deregister itself on $onDestroy event', () => {
    $element.attr('feedback-id', id);
    _compile();
    expect(service.registerContainer).toHaveBeenCalledWith(id, $element);
    expect(service.deregisterContainer).not.toHaveBeenCalled();
    $scope.$destroy();
    expect(service.deregisterContainer).toHaveBeenCalledWith(id);
  });

});
