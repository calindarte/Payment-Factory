import React, { useState } from "react";
import { getPaymentStatus, updatePayment, deletePayment } from "../services/paymentApi";
import Swal from "sweetalert2";

const PaymentManager = () => {
  const [id, setId] = useState("");
  const [payment, setPayment] = useState(null);
  const [editData, setEditData] = useState({ type: "", amount: "" });

  const handleSearch = async () => {
    try {
      const res = await getPaymentStatus(id);
      console.log(res.data)
      setPayment(res.data.payment);
      setEditData({ type: res.data.type, amount: res.data.amount });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "No se encontró el pago", "error");
      setPayment(null);
    }
  };

  const handleUpdate = async () => {
    try {
        console.log(id)
      const res = await updatePayment(id, {
        type: editData.type,
        amount: parseFloat(editData.amount)
      });
      setPayment(res.data.payment);
      Swal.fire("✅ Actualizado", "El pago fue modificado correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "No se pudo actualizar", "error");
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (confirm.isConfirmed) {
      try {
        await deletePayment(id);
        setPayment(null);
        Swal.fire("Eliminado", "El pago fue eliminado", "success");
      } catch (err) {
        Swal.fire("Error", err.response?.data?.error || "No se pudo eliminar", "error");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">🔍 Buscar, Editar o Eliminar Pago</h2>

      <div className="mb-4">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID del pago"
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Buscar Pago
        </button>
      </div>

      {payment && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">📄 Detalles del Pago</h3>
          <p><strong>ID:</strong> {payment.id}</p>
          <p><strong>Método:</strong> {payment.type}</p>
          <p><strong>Monto:</strong> ${payment.amount}</p>
          <p><strong>Comisión:</strong> ${payment.commission}</p>
          <p><strong>Total:</strong> ${payment.totalAmount}</p>
          <p><strong>Estado:</strong> {payment.status}</p>

          <div className="mt-4">
            <h4 className="font-medium mb-1">✏️ Modificar</h4>
            <select
              value={editData.type}
              onChange={(e) => setEditData({ ...editData, type: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-2"
            >
              <option value="credit_card">Tarjeta de Crédito</option>
              <option value="debit_card">Tarjeta de Débito</option>
              <option value="paypal">PayPal</option>
            </select>
            <input
              type="number"
              value={editData.amount}
              onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Modificar
            </button>

            <button
              onClick={handleDelete}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
            >
              Eliminar Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManager;
