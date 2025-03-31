const CreditCardFactory = require("../factories/CreditCardFactory");
const DebitCardFactory = require("../factories/DebitCardFactory");
const PayPalFactory = require("../factories/PayPalFactory");

class PaymentService {
    constructor() {
        this.paymentFactory = null;
    }

    processPayment(type, amount) {
        this.configureFactory(type);
        
        if (!this.paymentFactory) {
            throw new Error(`El método de pago "${type}" no es válido.`);
        }

        // Crear el pago con la fábrica
        const payment = this.paymentFactory.createPayment(amount);
        const processedPayment = payment.process();  // obtenemos los valores calculados
        
        return processedPayment; // Retorna el objeto con los cálculos correctos
    }

    configureFactory(type) {
        const typeLower = type.toLowerCase();

        if (typeLower === "credit_card") {
            this.paymentFactory = new CreditCardFactory();
        } else if (typeLower === "debit_card") {
            this.paymentFactory = new DebitCardFactory();
        } else if (typeLower === "paypal") {
            this.paymentFactory = new PayPalFactory();
        } else {
            this.paymentFactory = null;
        }
    }
}

module.exports = PaymentService;
