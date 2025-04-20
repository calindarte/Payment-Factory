class ReportDirector {
    constructor(builder) {
      this.builder = builder;
    }
  
    construct(config) {
      return this.builder
        .setIncludeLogo(config.includeLogo ?? true)
        .setTitle(config.title || 'Reporte de Pago')
        .setIncludePaymentDetails(config.includePaymentDetails ?? true)
        .setIncludeUserInfo(config.includeUserInfo ?? false)
        .setTheme(config.theme || 'LIGHT')
        .setIncludeTimestamp(config.includeTimestamp ?? true)
        .setFooterMessage(config.footerMessage || '')
        .setFormat(config.format || 'A4')
        .build();
    }
  }
  
  module.exports = ReportDirector;
  