import feedback from '../feedback.module';
import ServiceMock from './mocks/service.mock';

describe('Message Feedback', () => {
  let $compile;
  let $controller;
  let $element;
  let $timeout;
  let $scope;
  let message;
  let service;
  
  const mock = {
    service: ServiceMock
  };

  beforeEach(() => {
    $controller = {};

    angular.mock.module(feedback, ($provide) => {
      $provide.value('feedbackService', new mock.service());
    });

    inject((_$rootScope_, _$compile_, _$timeout_, _$httpBackend_, feedbackService) => {
      $element = angular.element('<ri-feedback-message>');
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
      $timeout = _$timeout_;
      service = feedbackService;
    });
  });

  let _compile = () => {
    $compile($element)($scope);
    $scope.$digest();
    $controller = $element.controller('riFeedbackMessage');
  }

  it('should expose an api property on the element', () => {
    _compile();
    expect($element[0].api).toBe($controller);
  });

  it('should set default type as info', () => {
    _compile();
    expect($controller.settings.type).toBe('info');
  });

  it('should set message type via attribute', () => {
    $element.attr('type', 'warning');
    _compile();
    expect($controller.settings.type).toBe('warning');
  });

  it('should set message header via attribute', () => {
    $element.attr('header', 'foo');
    _compile();
    expect($controller.settings.header).toBe('foo');
  });

  it('should set message flash via attribute', () => {
    $element.attr('flash', '10000');
    _compile();
    expect($controller.settings.flash).toBe(10000);
  });

  it('should set message flash default via attribute', () => {
    $element.attr('flash', '');
    _compile();
    expect($controller.settings.flash).toBe(5000);
  });

  it('should close flash messages after duration, once in DOM', () => {
    $element.attr('flash', '1000');
    _compile();
    $controller.close = jasmine.createSpy('close');
    $controller.sendTo('nowhere');
    $timeout.flush();
    expect($controller.close).toHaveBeenCalled();
  });

});
