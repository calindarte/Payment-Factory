// models/CryptoPayment.js
const Payment = require('./Payment');

class CryptoPayment extends Payment {
    process() {
        return `Pago con criptomonedas procesado: $${this.amount}`;
    }
}

module.exports = CryptoPayment;
