const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFReportBuilder {
  constructor() {
    this.report = {};
  }

  setIncludeLogo(include) {
    this.report.includeLogo = include;
    return this;
  }

  setTitle(title) {
    this.report.title = title;
    return this;
  }

  setIncludePaymentDetails(include) {
    this.report.includePaymentDetails = include;
    return this;
  }

  setIncludeUserInfo(include) {
    this.report.includeUserInfo = include;
    return this;
  }
  
  setLogoBase64(logoBase64) {
    this.report.logoBase64 = logoBase64;
    return this;
  }
  
  setTheme(theme) {
    this.report.theme = theme;
    return this;
  }

  setIncludeTimestamp(include) {
    this.report.includeTimestamp = include;
    return this;
  }

  setFooterMessage(msg) {
    this.report.footerMessage = msg;
    return this;
  }

  setFormat(format) {
    this.report.format = format;
    return this;
  }

  build() {
    const doc = new PDFDocument();
    
    // Definir el nombre del archivo PDF
    const filename = `reporte_${Date.now()}.pdf`;
    const filepath = path.join(__dirname, 'public', filename); // Guardarlo en la carpeta 'public'
    const writeStream = fs.createWriteStream(filepath);

    // Pipe al archivo
    doc.pipe(writeStream);

    // Título del reporte
    doc.fontSize(20).text(this.report.title || 'Reporte de Pago', { align: 'center' });

    // Si se incluye logo, lo agregamos (esto solo sería un ejemplo)
    if (this.report.includeLogo && this.report.logoBase64) {
      try {
        const base64Data = this.report.logoBase64.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        doc.image(buffer, 50, 50, { width: 100 });
      } catch (error) {
        console.error('Error al cargar el logo en base64:', error.message);
      }
    }
    

    // Si se incluye detalles de pago
    if (this.report.includePaymentDetails) {
      const { id, type, amount, status } = this.report.includePaymentDetails;

      doc.fontSize(12).text('Detalles de Pago:', { underline: true });
      if (id) doc.text(`Número de transacción: ${id}`);
      if (type) doc.text(`Tipo de pago: ${type}`);
      if (amount) doc.text(`Monto: ${amount}`);
      if (status) doc.text(`Estado: ${status}`);
      doc.moveDown();
    }

    // Información del usuario
    if (this.report.includeUserInfo) {
      const { fullName, email } = this.report.includeUserInfo;

      doc.fontSize(12).text('Información del Usuario:', { underline: true });
      if (fullName) doc.text(`Nombre completo: ${fullName}`);
      if (email) doc.text(`Correo electrónico: ${email}`);
      doc.moveDown();
    }

    // Timestamp
    if (this.report.includeTimestamp) {
      const timestamp = new Date().toISOString();
      doc.fontSize(10).text(`Generado: ${timestamp}`, { align: 'right' });
    }

    // Footer message
    if (this.report.footerMessage) {
      doc.fontSize(10).text(this.report.footerMessage, { align: 'center' });
    }

    // Finaliza el documento
    doc.end();


    return {
      ...this.report,
      filename,
      url: `http://localhost:3000/reports/${filename}`, // URL para descargar el archivo
    };
  }
}

module.exports = PDFReportBuilder;
