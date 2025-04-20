class PushNotificationBuilder {
    constructor() {
      this.notification = {};
    }
  
    setDeviceToken(token) {
      this.notification.deviceToken = token;
      return this;
    }
  
    setTitle(title) {
      this.notification.title = title;
      return this;
    }
  
    setMessage(message) {
      this.notification.message = message;
      return this;
    }
  
    setImageUrl(url) {
      this.notification.imageUrl = url;
      return this;
    }
  
    setClickAction(action) {
      this.notification.clickAction = action;
      return this;
    }
  
    setPriority(priority) {
      this.notification.priority = priority;
      return this;
    }
  
    build() {
      return {
        type: "PUSH",
        ...this.notification
      };
    }
  }
  
  module.exports = PushNotificationBuilder;
  