// models/CreditCardPayment.js
const Payment = require('./Payment');

class CreditCardPayment extends Payment {
    process() {
        return `Pago con tarjeta de crédito procesado: $${this.amount}`;
    }
}

module.exports = CreditCardPayment;
