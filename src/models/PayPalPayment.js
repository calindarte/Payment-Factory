// models/PayPalPayment.js
const Payment = require('./Payment');

class PayPalPayment extends Payment {
    process() {
        return `Pago con PayPal procesado: $${this.amount}`;
    }
}

module.exports = PayPalPayment;
