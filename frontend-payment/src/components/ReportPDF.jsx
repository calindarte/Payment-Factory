// import React from 'react'

// const ReportPDF = () => {
//     // 💡 Solicitar configuración del PDF al usuario
//     const { value: config } = await Swal.fire({
//         title: "🧾 Configuración del Reporte PDF",
//         html: `
//           <div style="text-align: left;">
//             <label for="title"><strong>Título del reporte:</strong></label>
//             <input id="title" class="swal2-input" placeholder="Ej: Comprobante de Pago">
      
//             <label for="logo"><strong>Logo (opcional):</strong></label>
//             <input type="file" id="logo" accept="image/*" class="swal2-file">
      
//             <div style="margin-top: 10px;">
//               <label><input type="checkbox" id="includeLogo" checked> Incluir logo</label><br/>
//               <label><input type="checkbox" id="includeDetails" checked> Incluir detalles del pago</label><br/>
//               <label><input type="checkbox" id="includeUser" checked> Incluir datos del usuario</label><br/>
//               <label><input type="checkbox" id="includeTimestamp" checked> Incluir fecha y hora</label>
//             </div>
      
//             <label for="footerMessage" style="margin-top: 10px;"><strong>Mensaje en el pie:</strong></label>
//             <input id="footerMessage" class="swal2-input" placeholder="Gracias por tu pago">
      
//             <label for="theme"><strong>Tema:</strong></label>
//             <select id="theme" class="swal2-input">
//               <option value="LIGHT">Claro</option>
//               <option value="DARK">Oscuro</option>
//             </select>
      
//             <label for="format"><strong>Formato:</strong></label>
//             <select id="format" class="swal2-input">
//               <option value="A4">A4</option>
//               <option value="LETTER">Carta</option>
//             </select>
//           </div>
//         `,
//         showCancelButton: true,
//         customClass: {
//           confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
//           cancelButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
//         },
//         buttonsStyling: false,
//         confirmButtonText: "Generar Reporte",
//         cancelButtonText: "Cancelar",
//         focusConfirm: false,
//         preConfirm: () => {
//           const logoInput = document.getElementById("logo");
//           const file = logoInput?.files?.[0];
      
//           return new Promise((resolve) => {
//             if (file) {
//               const reader = new FileReader();
//               reader.onload = () => {
//                 resolve({
//                   title: document.getElementById("title").value,
//                   includeLogo: document.getElementById("includeLogo").checked,
//                   includePaymentDetails: document.getElementById("includeDetails").checked,
//                   includeUserInfo: document.getElementById("includeUser").checked,
//                   includeTimestamp: document.getElementById("includeTimestamp").checked,
//                   footerMessage: document.getElementById("footerMessage").value,
//                   theme: document.getElementById("theme").value,
//                   format: document.getElementById("format").value,
//                   logoBase64: reader.result, // Se envía como base64
//                   type: type,  // Tipo de pago
//                   amount: amount // Monto del pago
//                 });
//               };
//               reader.readAsDataURL(file);
//             } else {
//               resolve({
//                 title: document.getElementById("title").value,
//                 includeLogo: document.getElementById("includeLogo").checked,
//                 includePaymentDetails: document.getElementById("includeDetails").checked,
//                 includeUserInfo: document.getElementById("includeUser").checked,
//                 includeTimestamp: document.getElementById("includeTimestamp").checked,
//                 footerMessage: document.getElementById("footerMessage").value,
//                 theme: document.getElementById("theme").value,
//                 format: document.getElementById("format").value,
//                 logoBase64: null,
//                 type: type,  // Tipo de pago
//                 amount: amount // Monto del pago
//               });
//             }
//           });
//         }
//       });
      
  
//   if (config) {
//     // Enviar configuración al backend para generar el reporte PDF
//     const response = await fetch("http://localhost:3000/report", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(config)
//     });
  
//     const report = await response.json();
  
//     // Abrir el PDF en una nueva pestaña
//     if (report.url) {
//       window.open(report.url, "_blank");
//     } else {
//       console.error("No se recibió la URL del PDF.");
//     }  
// }
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default ReportPDF
