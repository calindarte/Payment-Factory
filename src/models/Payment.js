// models/Payment.js
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    process() {
        throw new Error('Método process() debe ser implementado en la subclase');
    }
}

module.exports = Payment;
