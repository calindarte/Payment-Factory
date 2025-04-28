// src/prototype/PDFReport.js

class PDFReport {
    constructor(config) {
      this.includeLogo = config.includeLogo ?? true;
      this.title = config.title || 'Reporte de Pago';
      this.includePaymentDetails = config.includePaymentDetails ?? true;
      this.includeUserInfo = config.includeUserInfo ?? false;
      this.theme = config.theme || 'LIGHT';
      this.includeTimestamp = config.includeTimestamp ?? true;
      this.footerMessage = config.footerMessage || '';
      this.format = config.format || 'A4';
    }
  
    clone() {
      // Retorna una nueva instancia copiando esta configuración
      return new PDFReport({ 
        includeLogo: this.includeLogo,
        title: this.title,
        includePaymentDetails: this.includePaymentDetails,
        includeUserInfo: this.includeUserInfo,
        theme: this.theme,
        includeTimestamp: this.includeTimestamp,
        footerMessage: this.footerMessage,
        format: this.format
      });
    }
  }
  
  module.exports = PDFReport;
  