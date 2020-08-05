const express = require('express');
const fs = require('fs');

const app = express();

// Directory for static files like css and javascript
app.use(express.static('./app'));

app.get('/index.html', (req, res) => {
	// Load the main page of the app
	res.sendFile(`${__dirname}/app/index.html`);
})

// Function to get the order details
app.get('/get_order', (req, res) => {
	//Prepare output in JSON format
	response = {
		// Key:req.query.nameOfInput(defined in html)
		Bestellnummer:req.query.best_nr,
		Bestelldatum:req.query.best_datum,
	}

	// Convert response to a json string
	jsonResponse = JSON.stringify(response);

	fs.writeFile('order.txt', jsonResponse, (err) => {
		try {
			console.log(jsonResponse);
		} catch {
			console.log(err);
		}
	});

	res.sendFile(`${__dirname}/app/index.html`);
})

const server = app.listen(8081, () => {
	const host = server.address().address;
	const port = server.address().port;

	console.log(`App listening at http://${host}:${port}`);
});
