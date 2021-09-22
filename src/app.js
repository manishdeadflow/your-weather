const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const forecastAll = require("./utils/forecastAll");

const app = express();

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicPath));
const port=process.env.PORT || 3000

app.set("view engine", "hbs");
app.set("views", path.join(viewsPath));
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "no location provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error: error });
      forecast(latitude, longitude, (error, data) => {
        if (error) return res.send({ error: error });
        res.send({
          location: location,
          forecast: data.forecast,
          logo: data.logo,
        });
      });
    }
  );
});

app.get("/weather2", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "no location provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error: error });
      forecastAll(latitude, longitude, (error, data) => {
        if (error) return res.send({ error: error });
        res.send({
          data: data,
        });
      });
    }
  );
});

app.get("/extra", (req, res) => {
  res.render("extra");
});

app.get("/help", (req, res) => {
  res.render("help");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log("started");
});
