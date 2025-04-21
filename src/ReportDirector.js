class ReportDirector {
    constructor(builder) {
      this.builder = builder;
    }
  
    construct(config) {
      return this.builder
        .setIncludeLogo(config.includeLogo ?? true)
        .setTitle(config.title || 'Reporte de Pago')
        .setIncludePaymentDetails(config.includePaymentDetails ? {
          id: config.includePaymentDetails.id || '000001',
          type: config.type || 'Tarjeta de crédito',
          amount: config.amount || '$99.99',
          status: config.includePaymentDetails.status || 'Completado'
        } : null)
        .setIncludeUserInfo(config.includeUserInfo ?{
          fullName: 'Carlos Pérez',
          email: 'carlos.perez@example.com'
        } : null)
        .setTheme(config.theme || 'LIGHT')
        .setIncludeTimestamp(config.includeTimestamp ?? true)
        .setFooterMessage(config.footerMessage || '')
        .setFormat(config.format || 'A4')
        .setLogoBase64(config.logoBase64 || '')
        .build();
    }
  }
  
  module.exports = ReportDirector;
  