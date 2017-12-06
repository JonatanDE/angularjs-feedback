import MessageMock from './mocks/message.mock';
import ContainerMock from './mocks/container.mock';
import Service from '../feedback.service';

describe('Feedback Service', () => {
  let service;
  let container;
  let message;

  const mock = {
    message: MessageMock,
    container: ContainerMock
  };

  beforeEach(inject(() => {
    service = new Service();
    message = new mock.message();
    container = new mock.container();
  }));

  afterEach(() => {
    container.empty();
  });

  it('should register and get container by id', () => {
    const id = 'foo';
    service.registerContainer(id, container);
    const result = service.getContainer(id);
    expect(result[0].outerHTML).toBe('<ri-feedback-container></ri-feedback-container>');
  });

  it('should send message to a container', () => {
    const id = 'foo';
    service.registerContainer(id, container);
    service.sendMsgToContainer(message, id);
    const result = container.find('ri-feedback-message');
    expect(result.length).toBe(1);
  });

  it('should queue the message for send if container not set', () => {
    let queue = service.getQueue('foo');
    expect(queue).toBeUndefined();
    service.sendMsgToContainer(message, 'foo');
    const result = container.find('ri-feedback-message');
    expect(result.length).toBe(0);

    queue = service.getQueue('foo');
    expect(queue.length).toBe(1);
  });

  it('should send queued messages as soon as the container is registered', () => {
    service.sendMsgToContainer(message, 'foo');
    let queue = service.getQueue('foo');
    expect(queue.length).toBe(1);

    spyOn(container, "append");
    service.registerContainer('foo', container);
    expect(container.append).toHaveBeenCalledWith(message);
    queue = service.getQueue('foo');
    expect(queue).toBeUndefined();
  });

  it('should ignore clear if container not set', () => {
    service.registerContainer('foo', container);
    service.clearContainer('bar'); // container that doesn't exist
    expect(container[0].api.closeAll).not.toHaveBeenCalled();
  });

  it('should trigger closeAll via clearContainer', () => {
    service.registerContainer('foo', container);
    service.clearContainer('foo');
    expect(container[0].api.closeAll).toHaveBeenCalled();
  });

  it('should trigger closeAll via clearAllContainers', () => {
      const cont1 = Object.assign({}, container);
      const cont2 = Object.assign({}, container);
      service.registerContainer('1', cont1);
      service.registerContainer('2', cont2);
      service.clearAllContainers();
      expect(cont1[0].api.closeAll).toHaveBeenCalled();
      expect(cont2[0].api.closeAll).toHaveBeenCalled();
  });

  it('should clear all queues via clearAllContainers', () => {
    service.sendMsgToContainer(message, 'foo1');
    service.sendMsgToContainer(message, 'foo1');
    const queue1 = service.getQueue('foo1');
    expect(queue1.length).toBe(2);

    service.sendMsgToContainer(message, 'foo2');
    const queue2 = service.getQueue('foo2');
    expect(queue2.length).toBe(1);

    service.clearAllContainers();
    expect(service.getQueue('foo1')).toBeUndefined();
    expect(service.getQueue('foo2')).toBeUndefined();
  });

});
