  const express = require('express');
  const mysql = require('mysql2');
  const app = express();

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shipment',
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to database:', error);
    } else {
      console.log('Connected to database!');
    }
  });

  app.use(express.static('public'));
  app.use(express.json());

  app.get('/api/shipments/:trackId', (req, res) => {
    const trackId = req.params.trackId;
  
    connection.query(
      'SELECT * FROM shipments WHERE track_id = ?',
      [trackId],
      (error, results) => {
        if (error) {
          console.error('Error fetching shipment:', error);
          res.status(500).send('Error fetching shipment');
        } else if (results.length === 0) {
          console.log('No shipment found for track ID:', trackId);
          res.status(404).send('Shipment not found');
        } else {
          console.log('Shipment found:', results[0]);
          const shipment = results[0];
          res.json(shipment);
        }
      }
    );
  });
  

  app.post('/api/shipments', (req, res) => {
    const { client_name, phone_number, weight, status, location, track_id } =
      req.body;

    connection.query(
      `INSERT INTO shipments (client_name, phone_number, weight, status, location, track_id) VALUES ('${client_name}', '${phone_number}', '${weight}', '${status}', '${location}', '${track_id}')`,
      (error, results) => {
        if (error) {
          console.error('Error inserting shipment:', error);
          res.status(500).send('Error inserting shipment');
        } else {
          res.json({ success: true });
        }
      }
    );
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/admin/index.html');
  });
