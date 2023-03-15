const shipmentForm = document.getElementById('shipment-form');

shipmentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(shipmentForm);

  fetch('/admin/shipments', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log('Shipment added successfully!');
        shipmentForm.reset();
      } else {
        console.error('Error adding shipment:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error adding shipment:', error);
    });
});
const shipmentTable = document.getElementById('shipment-table');

fetch('/shipments')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error retrieving shipments:', response.statusText);
    }
  })
  .then((shipments) => {
    let tableHtml = `
      <table>
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Weight (kg)</th>
            <th>Status</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
    `;

    shipments.forEach((shipment) => {
      tableHtml += `
        <tr>
          <td>${shipment.id}</td>
          <td>${shipment.weight}</td>
          <td>${shipment.status}</td>
          <td>${shipment.location}</td>
          <td>
            <button class="edit-button" data-shipment-id="${shipment.id}">Edit</button>
          </td>
        </tr>
      `;
    });

    tableHtml += `
    </tbody>
  </table>
`;


    shipmentTable.innerHTML = tableHtml;

    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const shipmentId = event.target.dataset.shipmentId;
        const location = prompt('Enter new location:');

        if (location) {
          const formData = new FormData();
          formData.append('location', location);

          fetch(`/shipments/${shipmentId}`, {
            method: 'PUT',
            body: formData,
          })
            .then((response) => {
              if (response.ok) {
                console.log('Shipment updated successfully!');
                location.reload(true);
            } else {
                console.error('Error updating shipment:', response.statusText);
            }
            
            })
            .catch((error) => {
              console.error('Error updating shipment:', error);
            });
        }
      });
    });
  })
  .catch((error) => {
    console.error('Error retrieving shipments:', error);
  });
