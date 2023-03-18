const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let trasporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "4a09a4577f3ef7",
    pass: "8812ae3c079b53",
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHtml;

  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    (err, template) => {
      if (err) {
        console.log("Error in rendering template");
        return;
      }

      mailHtml = template;
    }
  );

  return mailHtml;
};

module.exports = {
  trasporter,
  renderTemplate,
};
