const PaymentFactory = require('./PaymentFactory');
const DebitCardPayment = require('../models/DebitCardPayment');

class DebitCardFactory extends PaymentFactory {
    createPayment(amount) {
        return new DebitCardPayment(amount);
    }
}

module.exports = DebitCardFactory;
