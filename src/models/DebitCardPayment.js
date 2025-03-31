const Payment = require('./Payment');

class DebitCardPayment extends Payment {
    constructor(amount) {
        super(amount);
        this.commissionRate = 0.01; // Tarifa de comisión para tarjetas de débito
    }

    calculateCommission() {
        let commission = this.amount * this.commissionRate;
        if (this.amount > 500) {
            commission += 5; // Cargo adicional si el monto es mayor a 1000
        }
        return commission; // 🔹 Solo retorna la comisión
    }
}

module.exports = DebitCardPayment;
