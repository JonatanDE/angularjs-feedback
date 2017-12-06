import Factory from '../feedback.factory';

describe('Feedback Factory', () => {
  let text = 'foo';
  let header = 'bar';
  let factory;
  let callback;

  beforeEach(inject((_$rootScope_, _$compile_) => {
    factory = new Factory(_$rootScope_, _$compile_);
    callback = jasmine.createSpy('callback');
  }));

  it('should create an HTML element via .newMessage()', () => {
    let msg = factory.newMessage();
    expect(msg.outerHTML).toBe('<ri-feedback-message class="ng-scope"></ri-feedback-message>');
  });

  it('should set the text body in the message', () => {
    let msg = angular.element(factory.newMessage(text));
    expect(msg.text()).toBe(text);
  });

  it('should set the header attr on the message', () => {
    let msg = angular.element(factory.newMessage(text, {
      header: header
    }));
    expect(msg.attr('header')).toBe(header);
  });

  it('should set the flash attr on the message', () => {
    let msg = angular.element(factory.newMessage(text, {
      flash: true
    }));
    expect(msg.attr('flash')).toBe('true');
  });

  it('should set correct type for .info()', () => {
    let msg = angular.element(factory.info(text));
    expect(msg.attr('type')).toBe('info');
  });

  it('should set correct type for .warning()', () => {
    let msg = angular.element(factory.warning(text));
    expect(msg.attr('type')).toBe('warning');
  });

  it('should set correct type for .error()', () => {
    let msg = angular.element(factory.error(text));
    expect(msg.attr('type')).toBe('error');
  });
});
