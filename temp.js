const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
app.use(express.static("abc"));

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'books',
	port: 3306
});


app.get('/addbook', function (req, resp) {
	let bookid = req.query.bookid;
	let bookname = req.query.bookname;
	let bookprice = req.query.bookprice;
	let output = { status: false }
	connection.query('insert into book(bookid,bookname,price) values(?,?,?)', [bookid, bookname, bookprice], (err, result) => {

		if (err) {
			console.log("Error occured" + err);
		} else {
			output.status = true;
			console.log(result.affectedRows);
		}
		resp.send(output);

	});

});
app.get('/showbooks', function (req, resp) {
	connection.query('select bookid,bookname,price from book', [], (err, result) => {

		if (err) {
			console.log("Error occured" + err);
		} else {
			console.log(result);
		}
		resp.send(result);

	});

});
app.listen(8081, function () {
	console.log("server listening at port 8081...");
});