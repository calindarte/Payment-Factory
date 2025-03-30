// factories/CreditCardFactory.js
const PaymentFactory = require('./PaymentFactory');
const CreditCardPayment = require('../models/CreditCardPayment');

class CreditCardFactory extends PaymentFactory {
    createPayment(amount) {
        return new CreditCardPayment(amount);
    }
}

module.exports = CreditCardFactory;
