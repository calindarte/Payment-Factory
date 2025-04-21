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
      console.log(response.data.message)
      setError("");
       // Mostrar modal de selección de notificación
    const { value: notificationType } = await Swal.fire({
      title: "¿Cómo deseas recibir la notificación?",
      input: "select",
      inputOptions: {
        EMAIL: "Correo electrónico",
        SMS: "Mensaje de texto (SMS)",
        PUSH: "Notificación push",
        WHATSAPP: "WhatsApp"
      },
      customClass: {
        confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
      },
      buttonsStyling: false,
      inputPlaceholder: "Selecciona un canal",
      showCancelButton: true,
      confirmButtonText: "Confirmar"
    });

    if (notificationType) {
      const notificationData = {
        type: notificationType,
    
        ...(notificationType === "EMAIL" && {
          to: "usuario@correo.com",
          subject: "Pago exitoso",
          body: `Gracias por tu pago de $${amount}.`,
          cc: ["copiacorreo@correo.com"],
          bcc: ["oculto@correo.com"],
          attachments: [
            {
              filename: "recibo.pdf",
              url: "https://example.com/recibo.pdf"
            }
          ],
          priority: "alta"
        }),
    
        ...(notificationType === "SMS" && {
          phoneNumber: "+573001234567",
          message: `Tu pago fue exitoso por $${amount}.`,
          senderId: "PagosApp",
          deliveryReportRequired: true,
          scheduleTime: null // o una fecha en formato ISO: "2025-04-20T14:30:00Z"
        }),
    
        ...(notificationType === "PUSH" && {
          deviceToken: "abc123def456ghi789",
          title: "Pago confirmado",
          message: `Se ha procesado correctamente tu pago de $${amount}.`,
          imageUrl: "https://example.com/pago.png",
          clickAction: "https://tuapp.com/confirmacion-pago",
          priority: "high"
        }),
    
        ...(notificationType === "WHATSAPP" && {
          phoneNumber: "+573001234567",
          message: `Tu pago fue exitoso por $${amount}.`,
          mediaUrl: "https://example.com/recibo.jpg",
          caption: "Recibo de pago",
          interactiveButtons: [
            { type: "reply", title: "Ver Detalles" },
            { type: "reply", title: "Contactar Soporte" }
          ],
          language: "es"
        })
      };
       // Enviar al backend
       await fetch("http://localhost:3000/notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationData)
      });

      Swal.fire("✅ Notificación enviada", "", "success");
    }
    // 💡 Solicitar configuración del PDF al usuario
    const { value: config } = await Swal.fire({
      title: "🧾 Configuración del Reporte PDF",
      html: `
        <div style="text-align: left;">
          <label for="title"><strong>Título del reporte:</strong></label>
          <input id="title" class="swal2-input" placeholder="Ej: Comprobante de Pago">
    
          <label for="logo"><strong>Logo (opcional):</strong></label>
          <input type="file" id="logo" accept="image/*" class="swal2-file">
    
          <div style="margin-top: 10px;">
            <label><input type="checkbox" id="includeLogo" checked> Incluir logo</label><br/>
            <label><input type="checkbox" id="includeDetails" checked> Incluir detalles del pago</label><br/>
            <label><input type="checkbox" id="includeUser" checked> Incluir datos del usuario</label><br/>
            <label><input type="checkbox" id="includeTimestamp" checked> Incluir fecha y hora</label>
          </div>
    
          <label for="footerMessage" style="margin-top: 10px;"><strong>Mensaje en el pie:</strong></label>
          <input id="footerMessage" class="swal2-input" placeholder="Gracias por tu pago">
    
          <label for="theme"><strong>Tema:</strong></label>
          <select id="theme" class="swal2-input">
            <option value="LIGHT">Claro</option>
            <option value="DARK">Oscuro</option>
          </select>
    
          <label for="format"><strong>Formato:</strong></label>
          <select id="format" class="swal2-input">
            <option value="A4">A4</option>
            <option value="LETTER">Carta</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      customClass: {
        confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
      },
      buttonsStyling: false,
      confirmButtonText: "Generar Reporte",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        const logoInput = document.getElementById("logo");
        const file = logoInput?.files?.[0];
    
        return new Promise((resolve) => {
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                title: document.getElementById("title").value,
                includeLogo: document.getElementById("includeLogo").checked,
                includePaymentDetails: document.getElementById("includeDetails").checked,
                includeUserInfo: document.getElementById("includeUser").checked,
                includeTimestamp: document.getElementById("includeTimestamp").checked,
                footerMessage: document.getElementById("footerMessage").value,
                theme: document.getElementById("theme").value,
                format: document.getElementById("format").value,
                logoBase64: reader.result, // Se envía como base64
                type: type,  // Tipo de pago
                amount: amount // Monto del pago
              });
            };
            reader.readAsDataURL(file);
          } else {
            resolve({
              title: document.getElementById("title").value,
              includeLogo: document.getElementById("includeLogo").checked,
              includePaymentDetails: document.getElementById("includeDetails").checked,
              includeUserInfo: document.getElementById("includeUser").checked,
              includeTimestamp: document.getElementById("includeTimestamp").checked,
              footerMessage: document.getElementById("footerMessage").value,
              theme: document.getElementById("theme").value,
              format: document.getElementById("format").value,
              logoBase64: null,
              type: type,  // Tipo de pago
              amount: amount // Monto del pago
            });
          }
        });
      }
    });
    

if (config) {
  // Enviar configuración al backend para generar el reporte PDF
  const response = await fetch("http://localhost:3000/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config)
  });

  const report = await response.json();

  // Abrir el PDF en una nueva pestaña
  if (report.url) {
    window.open(report.url, "_blank");
  } else {
    console.error("No se recibió la URL del PDF.");
  }  

  // // Crear el enlace para la descarga del reporte PDF
  // Swal.fire({
  //   title: "📄 Reporte Generado",
  //   html: `
  //     <p>Tu reporte ha sido generado con éxito.</p>
  //     <a href="${report.url}" target="_blank" rel="noopener" style="color:#3085d6;text-decoration:underline;">Ver Reporte</a><br/>
  //     <a href="${report.url}" download="reporte.pdf" style="color:#28a745;text-decoration:underline;">Descargar Reporte</a>
  //   `,
  //   icon: "success",
  //   confirmButtonText: "Cerrar"
  // });
  
  // Swal.fire({
  //   title: "📄 Reporte Generado",
  //   text: "Tu reporte ha sido generado con éxito.",
  //   icon: "success"
  // });
  setResult({ status: "success", amount });
}
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
          <p><strong>Estado:</strong> {result.status}</p>
          <p><strong>Monto:</strong> ${result.amount}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
