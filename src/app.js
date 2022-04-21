const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

const forecast = require("../utils/forecast");

//define paths for Express config
const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and view location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(public));

app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Daksh",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		message: "Please contact if you need any help",
		title: "Help",
		name: "Daksh",
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		name: "Daksh",
		title: "404 Page",
		errorMessage: "Help article not found",
	});
});

app.get("/about", (req, res) => {
	res.render("about", { title: "Created By", name: "Daksh" });
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		res.send({
			error: "Please provide an address",
		});
		return;
	}

	forecast(req.query.address, (error, data = {}) => {
		if (error) {
			res.send({
				error,
			});
			return;
		}
		res.send({
			forecast: data.current.weather_descriptions[0],
			temperature: data.current.temperature,
			address: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
			location: req.query.address,
		});
	});
});

app.get("/products", (req, res) => {
	console.log(req.query);
	res.send({
		products: [],
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		name: "Daksh",
		title: "404 Page",
		errorMessage: "Page not found",
	});
});

app.listen(3000, () => {
	console.log("Server Running");
});
