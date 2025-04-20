class WhatsAppNotificationBuilder {
    constructor() {
      this.notification = {};
    }
  
    setPhoneNumber(number) {
      this.notification.phoneNumber = number;
      return this;
    }
  
    setMessage(message) {
      this.notification.message = message;
      return this;
    }
  
    setMediaUrl(url) {
      this.notification.mediaUrl = url;
      return this;
    }
  
    setCaption(caption) {
      this.notification.caption = caption;
      return this;
    }
  
    setInteractiveButtons(buttons) {
      this.notification.interactiveButtons = buttons;
      return this;
    }
  
    setLanguage(lang) {
      this.notification.language = lang;
      return this;
    }
  
    build() {
      return {
        type: "WHATSAPP",
        ...this.notification
      };
    }
  }
  
  module.exports = WhatsAppNotificationBuilder;
  