// factories/BankTransferFactory.js
const PaymentFactory = require('./PaymentFactory');
const BankTransferPayment = require('../models/BankTransferPayment');

class BankTransferFactory extends PaymentFactory {
    createPayment(amount) {
        return new BankTransferPayment(amount);
    }
}

module.exports = BankTransferFactory;
