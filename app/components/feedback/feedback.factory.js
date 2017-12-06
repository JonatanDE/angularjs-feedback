/**
 * The feedbackFactory is a helper utility for generating feedback message
 * objects. Each method returns an HTMLElement that can then be appended
 * to the DOM
 *
 * Usage Examples:
 * // Create a flash info message that disappears after 60 seconds
 * var msg = FeedbackFactory.info('Information is good', {flash: 60000});
 *
 * @param $rootScope
 * @param $compile
 * @constructor
 */

class FeedbackFactory {
  constructor($rootScope, $compile) {
    Object.assign(this, {
      $rootScope,
      $compile
    })
  }

  /**
   * A message element is created and options set, then compiled
   * with a new scope and returned.
   * @param {string} [text]
   * @param {object} [opts]
   * @returns {HTMLElement}
   */
  newMessage(text, opts) {

    text = text || '';
    opts = opts || {};

    let msg = angular.element('<ri-feedback-message/>');
    let scope = this.$rootScope.$new();

    msg.text(text);

    if (opts.type) {
      msg.attr('type', opts.type);
    }

    if (opts.header) {
      msg.attr('header', opts.header);
    }

    if (opts.flash) {
      msg.attr('flash', opts.flash);
    }

    this.$compile(msg)(scope);

    return msg[0];
  }

  /**
   * Create and return a new info message
   * @param {string} [text]
   * @param {object} [opts]
   */
  info(text, opts) {
    opts = angular.extend(opts || {}, {
      type: 'info'
    });
    return this.newMessage(text, opts);
  }

  /**
   * Create and return a new error message
   * @param {string} [text]
   * @param {object} [opts]
   */
  error(text, opts) {
    opts = angular.extend(opts || {}, {
      type: 'error'
    });
    return this.newMessage(text, opts);
  }

  /**
   * Create and return a new warning message
   * @param {string} [text]
   * @param {object} [opts]
   */
  warning(text, opts) {
    opts = angular.extend(opts || {}, {
      type: 'warning'
    });
    return this.newMessage(text, opts);
  }
}

export default FeedbackFactory;
