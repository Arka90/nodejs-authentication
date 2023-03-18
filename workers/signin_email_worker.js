const queue = require("../config/kue");

const signinMailer = require("../mailers/signin_mailer");

queue.process("emails_signed_in", function (job, done) {
  console.log("Email worker is processing a job", job.data);
  signinMailer.signIn(job.data);

  done();
});
