import React, { useState } from "react";
import { createPayment } from "../services/paymentApi";
import Swal from 'sweetalert2';


const PaymentForm = () => {
  const [type, setType] = useState("credit_card");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!amount || isNaN(amount)) {
      setError("Ingresa un monto válido.");
      return;
    }
  
    try {
      console.log("🧾 Enviando datos:", { type, amount });
  
      const response = await createPayment({ type, amount: parseFloat(amount) });
  
      console.log("✅ Respuesta del backend:", response.data);
  
      // Asigna correctamente el resultado
      setResult(response.data.payment);
      console.log(response.data.message)
      setError("");
      Swal.fire({
        title: '✅ ¡Pago exitoso!',
        html: `
          <p>${response.data.message}</p>
        `,
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });
    } catch (err) {
      console.error("❌ Error al procesar el pago:", err);
      setError(err.response?.data?.error || "Error al procesar el pago");
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6 border dark:border-zinc-800 dark:bg-zinc-800 dark:text-white">
      <h2 className="text-xl font-bold mb-4">💳 Realizar Pago</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Método de pago:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 dark:text-zinc-900"
          >
            <option value="credit_card">Tarjeta de Crédito</option>
            <option value="debit_card">Tarjeta de Débito</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Monto:</label>
          <input
            type="number"
            placeholder="Ingrese Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 dark:text-zinc-900"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Pagar
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 font-semibold">{error}</p>
      )}

      {result && (
        <div className="mt-6 bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">✅ Resultado del Pago</h3>
          <p><strong>ID:</strong> {result.id}</p>
          <p><strong>Método:</strong> {result.type}</p>
          <p><strong>Monto:</strong> ${result.amount}</p>
          <p><strong>Comisión:</strong> ${result.commission}</p>
          <p><strong>Total a Pagar:</strong> ${result.totalAmount}</p>
          <p><strong>Estado:</strong> {result.status}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
