//requiring all modules
const axios = require("axios");
const express = require("express");
// const expressip = require('express-ip')
const path = require("path");
// const handlebars = require("express-handlebars");

//port and starting express
const app = express();
const PORT = process.env.PORT || 5555;

const exphbs = require("express-handlebars");

//templating language defining
app.set("view engine", "hbs");

// app.use(expressip().getIpInfoMiddleware);
app.use(express.static(path.join(__dirname, "assets")));

var users = [];

// get request to initial url
// will open index.hbs file
app.get("/", (req, res) => {
  res.render("index", {
    title: "Job Search"
  });
});

app.get("/search", (req, res) => {
  //query to search on api
  queries = req.query;
  queries['max'] = 15
  console.log(queries)
  //api to find job
  let url = `https://indreed.herokuapp.com/api/jobs`;

  if (queries) {
    axios
      .get(url, {
        params: queries
      })
      .then(response => {
        // console.log("inside then axios");
        res.render("search", {
          title: "Job Search",
          jobs: response.data
        });
        // res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    res.render("search", {
      title: "Job Search"
    });
  }
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Job Search"
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Job Search"
  });
});

app.post("/feedback", (req, res) => {
  users.push({
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
    message: req.body.message
  });

  res.send();
});

//server running on port
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});