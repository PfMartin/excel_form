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
		Besteller:req.query.besteller,
		Lieferant:req.query.lieferant,
		Bestellinhalt:req.query.best_inhalt,
		Typ:req.query.typ,
		Projektbezug:req.query.projektbezug,
		Projektnummer:req.query.projektnummer,
		Spesen:req.query.spesen,
		Liefermonat:req.query.liefermonat,
		Lieferstatus:req.query.lieferstatus,
		Rechnung:req.query.rechnung,
	}

	// Create a variable for the string that should be written to the file
	let order;

	// Loop through the json object key by key
	for(let key in response) {
		if(response.hasOwnProperty(key)) {
			if(response[key] !== undefined) {
				order += `${response[key]},`;
			} else {
				order += ``;
			}
		}
	}

	order = order.replace(/.$/, "\n");

	let outputFile = 'orders.csv';
	// console.log(JSON.stringify(response));
	console.log(order);
	fs.appendFile(outputFile, order, (err) => {
		try {
			console.log("Saved order");
		} catch (err) {
			console.log(`Couldn't save the order because:\n${err}`);
		}
	})
	// fs.writeFile(outputFile, jsonResponse, (err) => {
	// 	try {
	// 		console.log(`Output saved to ${outputFile}`)
	// 	} catch {
	// 		console.log(err);
	// 	}
	// });

	res.sendFile(`${__dirname}/app/index.html`);

})

const server = app.listen(8081, () => {
	const host = server.address().address;
	const port = server.address().port;

	console.log(`App listening at http://${host}:${port}`);
});

