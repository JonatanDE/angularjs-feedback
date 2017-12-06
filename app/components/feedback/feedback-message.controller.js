import config from './feedback.config';

/**
 * This is the controller for components
 *
 * @param $scope
 * @param $element
 * @param $attrs
 * @param $timeout
 * @param feedbackService
 * @param feedbackProvider
 * @constructor
 */
class MessageController {
  constructor($scope, $element, $attrs, $timeout, feedbackService, feedbackProvider) {
    Object.assign(this, {
      $scope,
      $element,
      $attrs,
      $timeout,
      feedbackService,
      feedbackProvider
    });

    this._element = this.$element;

    /**
     * Public settings for the feedback message
     * @type {object}
     */
    this.settings = {
      text: '',
      type: '',
      header: '',
      flash: false
    };

    this._init();
  }

  /**
   * Init MessageController by attaching the API
   * with the original context it was created
   * @private
   */
  _init() {
    // Attach message value to scope for message override
    this.message = this.$scope.message;
    
    this.$element[0].api = this;

    this._mergeDefaults(this.$attrs.type, this.feedbackProvider.configuredDefaults);

    this._setType(this.$attrs.type);
    this._setHeader(this.$attrs.header);
    this._setFlash(this.$attrs.flash);
  }

  /**
   * Closes the feedback message by adding a 'fade' class to the
   * element, which triggers it to fade out over a short duration
   */
  close() {
    this._element.addClass('fade');
    this.$timeout(() => {
      this._element.remove();
      this.$scope.$destroy();
    }, config.remove.duration);
  }

  /**
   * Send this message to a specific container.
   * @param {string} containerId
   */
  sendTo(containerId) {
    this.feedbackService.sendMsgToContainer(this._element, containerId);
    if (this.settings.flash) {
      this.$timeout(() => {
        this.close();
      }, this.settings.flash);
    }
  }

  /**
   * Set whether the feedback message should only appear temporarily
   * and then be removed automatically. If no value is passed in at
   * time of creation, then a default duration is set.
   * @param {number} duration
   * @private
   */
  _setFlash(duration) {
    // handle default overrides
    if (duration === 'false') {
      return;
    }
    if (typeof duration !== 'undefined') {
      this.settings.flash = parseInt(duration, 10) || config.flash.duration;
      this.$timeout(() => {
        this.close();
      }, this.settings.flash);
    }
  }

  /**
   * Set the header of the feedback message.
   * @param {string} header
   * @private
   */
  _setHeader(header) {
    if (typeof header !== 'undefined') {
      this.settings.header = header;
    }
  }

  /**
   * Type of messages: info, warning, error
   * @param {string} type
   * @private
   */
  _setType(type) {
    type = (config.types[type]) ? type : config.default;
    this.settings.type = type;
    this.settings.header = config.types[type].header;
  }

  /**
   * Merge options set at config time. These will update
   * attributes that haven't been set'
   * @param type {string}
   * @param providerDefaults {Array}
   * @private
   */
  _mergeDefaults(type, providerDefaults) {
    if (!providerDefaults[type]) {
      return;
    }
    angular.extend(this.$attrs, providerDefaults[type]);
  }
}

export default MessageController;
