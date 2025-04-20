class EmailNotificationBuilder {
    constructor() {
      this.notification = {};
    }
  
    setTo(to) {
      this.notification.to = to;
      return this;
    }
  
    setSubject(subject) {
      this.notification.subject = subject;
      return this;
    }
  
    setBody(body) {
      this.notification.body = body;
      return this;
    }
  
    setCc(cc) {
      this.notification.cc = cc;
      return this;
    }
  
    setBcc(bcc) {
      this.notification.bcc = bcc;
      return this;
    }
  
    setAttachments(attachments) {
      this.notification.attachments = attachments;
      return this;
    }
  
    setPriority(priority) {
      this.notification.priority = priority;
      return this;
    }
  
    build() {
      return {
        type: "EMAIL",
        ...this.notification
      };
    }
  }
  
  module.exports = EmailNotificationBuilder;
  