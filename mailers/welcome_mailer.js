const nodeMailer = require("../config/nodemailer");

exports.welcome = (user) => {
  let htmlString = nodeMailer.renderTemplate(
    { user: user },
    "/welcome/welcome.ejs"
  );

  nodeMailer.trasporter.sendMail(
    {
      from: "applicationadmin@gmail.com",
      to: user.email,
      subject: "Welcome!!",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error publishing the mail", err);
        return;
      }

      console.log("Message Sent !!!");
    }
  );
};
