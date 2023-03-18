const nodeMailer = require("../config/nodemailer");

exports.signIn = (user) => {
  let htmlString = nodeMailer.renderTemplate(
    { user: user },
    "/signed_in/sign_in.ejs"
  );

  nodeMailer.trasporter.sendMail(
    {
      from: "applicationadmin@gmail.com",
      to: user.email,
      subject: "Signed In",
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
