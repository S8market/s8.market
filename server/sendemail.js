// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config(); 
//   //  const options = {
//   //   from: process.env.SMTP_MAIL,
//   //   to: to,
//   //   subject,
//   //   html: message,
//   // };
//   // try {
//   //   await transporter.sendMail(options);
//   //   console.log("Email sent successfully!");
//   // } catch (error) {
//   //   console.error("Error sending email:", error);
//   // }



// export const sendEmail = async ({ to, subject, text }) => {
//   try {
//     // create transporter with Gmail SMTP
//      console.log(to,subject,text);
//     const transporter = nodemailer.createTransport({
     
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USERNAME, // "s8contact.us@gmail.com"
//         pass: process.env.EMAIL_PASSWORD, // your Gmail App Password
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USERNAME, // sender email
//       to,
//       subject,
//       text,
//     };
//     console.log(mailOptions);
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Email could not be sent");
//   }
// };
import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: message,
  };
  try {
    await transporter.sendMail(options);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};