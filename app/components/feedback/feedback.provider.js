/**
 * Allows general default options by type.
 */
class FeedbackProvider {
  constructor() {
    this.configuredDefaults = {};
  }

  /**
   * Used to store multiple configurations
   * using feedback message type as the key
   * for use by the message controller later.
   * 
   * Example: 
   * feedbackProvider.setDefaults({});
   * @param configObject {Object}
   */
  setDefaults(configObj) {
    Object.assign(this.configuredDefaults, configObj);
  }

  /**
   * Used to store a single default configuration 
   * for use by the message controller later.
   * @param type {String}
   * @param options {Object}
   */
  setDefault(type, options) {
    this.configuredDefaults[type] = options;
  }

  $get() {
    return this;
  }
}

export default FeedbackProvider;
