const db = require('./db');

db.query(
  'INSERT INTO shipments (client_name, phone_number, weight, status, location, track_id) VALUES (?, ?, ?, ?, ?, ?)',
  ['John Smith', '555-1234', 2.5, 'In Warehouse', 'Los Angeles', 'ABC123'],
  (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Shipment added to database:', results);
    }
  }
);

db.query(
  'INSERT INTO shipments (client_name, phone_number, weight, status, location, track_id) VALUES (?, ?, ?, ?, ?, ?)',
  ['Jane Doe', '555-5678', 1.8, 'On the Way', 'New York', 'DEF456'],
  (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Shipment added to database:', results);
    }
  }
);

db.query(
  'INSERT INTO shipments (client_name, phone_number, weight, status, location, track_id) VALUES (?, ?, ?, ?, ?, ?)',
  ['Bob Johnson', '555-9876', 3.2, 'Delivered', 'Chicago', 'GHI789'],
  (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Shipment added to database:', results);
    }
  }
);
