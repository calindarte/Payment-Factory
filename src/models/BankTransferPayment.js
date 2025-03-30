// models/BankTransferPayment.js
const Payment = require('./Payment');

class BankTransferPayment extends Payment {
    process() {
        return `Pago por transferencia bancaria procesado: $${this.amount}`;
    }
}

module.exports = BankTransferPayment;
