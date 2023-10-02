import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = process.env.port || 3000;
const todolist = [];
const worklist = [];
var today = '';

const dateToday = (req,res,next) => {
	var options = { weekday: 'long', month: 'long', day: 'numeric' };
	var date = new Date();
	var formatDate = date.toLocaleDateString("en-US",options);
	var data = {date:formatDate};
	today = data.date;
	next();
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(dateToday);


app.get('/', (req, res) => {
	res.render('index.ejs', { todolist: todolist, date: today});
});

app.post('/add', (req, res) => {
	todolist.push(req.body.list);
	res.redirect("/");
});


app.get('/work', (req, res) => {
	res.render('work.ejs', { worklist: worklist });
});

app.post('/work/add', (req, res) => {
	worklist.push(req.body.list);
	res.redirect("/work");
});

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
