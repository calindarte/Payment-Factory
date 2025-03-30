// factories/PayPalFactory.js
const PaymentFactory = require('./PaymentFactory');
const PayPalPayment = require('../models/PayPalPayment');

class PayPalFactory extends PaymentFactory {
    createPayment(amount) {
        return new PayPalPayment(amount);
    }
}

module.exports = PayPalFactory;
