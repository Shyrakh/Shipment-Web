const trackForm = document.getElementById('track-form');
const shipmentDetails = document.getElementById('shipment-details');

trackForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(trackForm);
  const trackId = formData.get('trackId');

  fetch(`/api/shipments/${trackId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Shipment not found');
      }
    })
    .then((shipment) => {
      shipmentDetails.innerHTML = `
        <h2>Shipment Details</h2>
        <ul>
          <li><strong>Client Name:</strong> ${shipment.client_name}</li>
          <li><strong>Phone Number:</strong> ${shipment.phone_number}</li>
          <li><strong>Weight (kg):</strong> ${shipment.weight}</li>
          <li><strong>Status:</strong> ${shipment.status}</li>
          <li><strong>Location:</strong> ${shipment.location}</li>
          <li><strong>Track ID:</strong> ${shipment.track_id}</li>
        </ul>
      `;
    })
    .catch((error) => {
      shipmentDetails.innerHTML = `
      <h2>Shipment Details</h2>
      <p>${error.message}</p>
    `;
  });
});