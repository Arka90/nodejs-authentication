const nodeMailer = require("../config/nodemailer");

exports.resetPassLink = (link, user) => {
  let htmlString = nodeMailer.renderTemplate(
    { link: link },
    "/forgot_password/forgot_pass.ejs"
  );

  nodeMailer.trasporter.sendMail(
    {
      from: "applicationadmin@gmail.com",
      to: user.email,
      subject: "Password Reset",
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
