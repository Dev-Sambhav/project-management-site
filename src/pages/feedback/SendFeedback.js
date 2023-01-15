import emailjs from "emailjs-com";

const SendFeedback = (feedback) => {
  let templateParams = {
    to_name: "Sambhav Sharma",
    from_name: feedback.name,
    message: feedback.message,
  };
  // Step 1: Send the email using EmailJS
  emailjs
    .send(
      "service_zorf9ap",
      "template_k4e07ne",
      templateParams,
      "OHvt5SBkFTQAzWRTu"
    )
    .then((res) => {
      console.log("Email sent successfully");
    })
    .catch((err) => {
      console.log("Error occurred: ", err);
    });
};

export default SendFeedback;
