const queue = require("../config/kue");

const welcomeMailer = require("../mailers/welcome_mailer");

queue.process("emails", function (job, done) {
  console.log("Email worker is processing a job", job.data);
  welcomeMailer.welcome(job.data);
  done();
});
