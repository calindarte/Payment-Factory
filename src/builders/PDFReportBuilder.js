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
      return {
        type: "PDF_REPORT",
        ...this.report
      };
    }
  }
  
  module.exports = PDFReportBuilder;
  