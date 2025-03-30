// services/PaymentService.js
const CreditCardFactory = require('../factories/CreditCardFactory');
const PayPalFactory = require('../factories/PayPalFactory');
const BankTransferFactory = require('../factories/BankTransferFactory');
const CryptoFactory = require('../factories/CryptoFactory');

class PaymentService {
    constructor() {
        this.paymentFactory = null;
    }

    processPayment(type, amount) {
        this.configureFactory(type);
        const payment = this.paymentFactory.createPayment(amount);
        return payment.process();
    }

    configureFactory(type) {
        switch (type.toLowerCase()) {
            case 'credit_card':
                this.paymentFactory = new CreditCardFactory();
                break;
            case 'paypal':
                this.paymentFactory = new PayPalFactory();
                break;
            case 'bank_transfer':
                this.paymentFactory = new BankTransferFactory();
                break;
            case 'crypto':
                this.paymentFactory = new CryptoFactory();
                break;
            default:
                throw new Error('Método de pago no soportado');
        }
    }
}

module.exports = PaymentService;
