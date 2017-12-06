class MainController {
  constructor(feedbackFactory, feedbackService) {
    Object.assign(this, {
      feedbackFactory,
      feedbackService
    });

    let msg = feedbackFactory.info('Will disapear in 90 seconds...', {
      header: 'Welcome',
      flash: 90000
    });
    msg.api.sendTo('globalMessages');

    this.categories = [{
      category: 'globalMessages'
    }, {
      category: 'inlineMessages'
    }];

    this.setCategory = this.categories[0].category;
  }

  showNotification(t) {
    let type = t || 'info';

    let msg = this.feedbackFactory[type](this.setMessage || 'New message', {
      header: this.setHeader,
    });
    msg.api.sendTo(this.setCategory);
  }

  clearAll() {
    this.feedbackService.clearAllContainers();
  }
}

export default MainController;
