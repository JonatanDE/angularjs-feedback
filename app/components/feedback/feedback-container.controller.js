/**
 *
 * @param $element
 * @param $attrs
 * @param feedbackService
 * @constructor
 */

class ContainerController {
  constructor($element, $attrs, feedbackService) {
    Object.assign(this, {
      $element,
      $attrs,
      feedbackService
    });

    this._id = '';

    this._init();
  }

  /**
   * Init ContainerController by attaching the API
   * to the container element, and registering it with the feedbackService
   * @private
   */
  _init() {
    this.$element[0].api = this;
    this._id = this.$attrs.feedbackId || Math.random().toString(36).substr(2, 6);
    this.feedbackService.registerContainer(this._id, this.$element);
  }

  /**
   * Cleanly close all messages in the container
   */
  closeAll() {
    const msgs = this.$element.find('ri-feedback-message');
    for (let m in msgs) {
      if(typeof msgs[m] === 'object') {
        msgs[m].api.close();
      }
    }
  }

  /**
   * Clean up when the container scope is destroyed
   */
  destroy() {
    this.feedbackService.deregisterContainer(this._id);
  }

  $onDestroy() {
    this.destroy();
  };

}

export default ContainerController;
