export default function () {
  return {
    getContainer: jasmine.createSpy('getContainer'),
    clearContainer: jasmine.createSpy('clearContainer'),
    registerContainer: jasmine.createSpy('registerContainer'),
    deregisterContainer: jasmine.createSpy('deregisterContainer'),
    clearAllContainers: jasmine.createSpy('clearAllContainers'),
    sendMsgToContainer: jasmine.createSpy('sendMsgToContainer')
  }
};
