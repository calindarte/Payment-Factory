class NotificationDirector {
    constructor(builder) {
      this.builder = builder;
    }
  
    construct(data) {
      // cada tipo de builder acepta diferentes datos, por eso verificamos aquí
      if (data.type === 'EMAIL') {
        return this.builder
          .setTo(data.to)
          .setSubject(data.subject)
          .setBody(data.body)
          .setCc(data.cc || [])
          .setBcc(data.bcc || [])
          .setAttachments(data.attachments || [])
          .setPriority(data.priority || 'media')
          .build();
      }
  
      if (data.type === 'SMS') {
        return this.builder
          .setPhoneNumber(data.phoneNumber)
          .setMessage(data.message)
          .setSenderId(data.senderId || '')
          .setDeliveryReportRequired(data.deliveryReportRequired || false)
          .setScheduleTime(data.scheduleTime || null)
          .build();
      }
  
      if (data.type === 'PUSH') {
        return this.builder
          .setDeviceToken(data.deviceToken)
          .setTitle(data.title)
          .setMessage(data.message)
          .setImageUrl(data.imageUrl || '')
          .setClickAction(data.clickAction || '')
          .setPriority(data.priority || 'normal')
          .build();
      }
  
      if (data.type === 'WHATSAPP') {
        return this.builder
          .setPhoneNumber(data.phoneNumber)
          .setMessage(data.message)
          .setMediaUrl(data.mediaUrl || '')
          .setCaption(data.caption || '')
          .setInteractiveButtons(data.interactiveButtons || [])
          .setLanguage(data.language || 'es')
          .build();
      }
  
      throw new Error('Tipo de notificación no soportado');
    }
  }
  
  module.exports = NotificationDirector;
  