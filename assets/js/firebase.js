let contactInfo = firebase.database().ref("user_messages");

document.querySelector(".form").addEventListener("submit", submitForm);

function saveContactInfo(name, subject, message, email) {
  console.log("I can run");
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    subject: subject,
    message: message,
  });
}

function submitForm(e) {
  let name = document.querySelector(".fname").value;
  let email = document.querySelector(".email").value;
  let subject = document.querySelector(".subject").value;
  let message = document.querySelector(".message").value;
  e.preventDefault();
  console.log(name, subject, message);

  saveContactInfo(name, subject, message, email);

  name.innerHTML = " ";
  email.innerHTML = " ";
  subject.innerHTML = " ";
  message.innerHTML = " ";

  //Send Email
  let toName = document.querySelector(".fname").value;
  let toEmail = document.querySelector(".email").value;

  let to_message =
    "Thank you so much for contacting us. We have received your kindly message😊";

  function sendMail() {
    var tempParams = {
      to_name: toName,
      message: to_message,
      to_email: toEmail,
    };
    emailjs
      .send("service_tfl227i", "template_vviwg1s", tempParams)
      .then(function (res) {
        console.log("success", res.status);
      });
  }

  sendMail();
  setTimeout(function () {
    window.location.href = "#hero";
  }, 5000);
}
