class SMSNotificationBuilder {
    constructor() {
      this.notification = {};
    }
  
    setPhoneNumber(phoneNumber) {
      this.notification.phoneNumber = phoneNumber;
      return this;
    }
  
    setMessage(message) {
      this.notification.message = message;
      return this;
    }
  
    setSenderId(senderId) {
      this.notification.senderId = senderId;
      return this;
    }
  
    setDeliveryReportRequired(required) {
      this.notification.deliveryReportRequired = required;
      return this;
    }
  
    setScheduleTime(scheduleTime) {
      this.notification.scheduleTime = scheduleTime;
      return this;
    }
  
    build() {
      return {
        type: "SMS",
        ...this.notification
      };
    }
  }
  
  module.exports = SMSNotificationBuilder;
  