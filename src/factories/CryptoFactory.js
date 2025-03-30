// factories/CryptoFactory.js
const PaymentFactory = require('./PaymentFactory');
const CryptoPayment = require('../models/CryptoPayment');

class CryptoFactory extends PaymentFactory {
    createPayment(amount) {
        return new CryptoPayment(amount);
    }
}

module.exports = CryptoFactory;
