/**
 * Main core service for feedback component
 * Lifecycle of containers and messages queues in component
 * Every container is unique instance with it's own messages
 * Can be designed and implemented for difirent ocassions
 */
class FeedbackService {
  constructor() {
    this._containers = {};
    this._messageQueue = {};
  }

  /**
   * Store reference to a container.
   * @param {string} id
   * @param {ng.element} $element
   */
  registerContainer(id, $element) {
    this._containers[id] = $element;

    let queue = this.getQueue(id);
    if (queue) {
      queue.forEach((msg) => {
        this.sendMsgToContainer(msg, id);
      });
      delete this._messageQueue[id];
    }
  }

  /**
   * Delete reference to a container.
   * @param {string} id
   */
  deregisterContainer(id) {
    delete this._containers[id];
  }

  /**
   * Return container element by id
   * @param {string} id
   * @returns {ng.element}
   */
  getContainer(id) {
    return this._containers[id];
  }


  /**
   * Return message queue by id
   * @param {string} id
   * @returns {array}
   */
  getQueue(id) {
    return this._messageQueue[id];
  }

  /**
   * Append a message element to a specific container
   * @param {ng.element} msg
   * @param {string} id
   */
  sendMsgToContainer(msg, id) {
    let container = this.getContainer(id);
    if (container) {
      container.append(msg);
    } else {
      let queue = this.getQueue(id);
      if (queue) {
        queue.push(msg);
      } else {
        this._messageQueue[id] = [msg];
      }
    }
  }

  /**
   * Clear messages from a single container and clears it's queued messages
   * @param {string} id
   */
  clearContainer(id) {
    let container = this.getContainer(id);
    if (container) {
      container[0].api.closeAll();
    }
  }

  /**
   * Clear messages from all containers and queues
   */
  clearAllContainers() {
    for (let container in this._containers) {
      this._containers[container][0].api.closeAll();
    }
    this._messageQueue = {};
  }
}

export default FeedbackService;
