//requiring all modules
const axios = require("axios");
const express = require("express");
// const expressip = require('express-ip')
const path = require("path");
// const handlebars = require("express-handlebars");
const nodemailer = require("nodemailer");


//port and starting express
const app = express();
const PORT = process.env.PORT || 5555;

const exphbs = require("express-handlebars");

//templating language defining
app.set("view engine", "hbs");

// app.use(expressip().getIpInfoMiddleware);
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, "assets")));

var users = [];


async function main() {

  console.log('inside mailer')
  console.log(users)

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      user: '*************', // generated ethereal user
      pass: '*************' // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${users[0].email}`, // sender address
    to: `jatin6972@gmail.com`, // list of receivers
    subject: ` SUGGESTION    `, // Subject line
    text: ` ${users[0].message}    `, // plain text body
    html: `<b> ${users[0].message}  </b>` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}



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


  console.log('in feeback server')
  console.log(req.body.name)
  users.push({
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
    message: req.body.message
  });

  console.log(users)
  main();

  res.send({

  });
});

//server running on port
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
app.get("//", (req, res) => {
  res.render("index2", {
    title: "Job Searching"
  });
});

module.exports = {
  users
}