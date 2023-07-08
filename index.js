const axios = require("axios");
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Retrieve website URL from environment variable
const websiteUrl = process.env.WEBSITE_URL;

// This is set up to work with send grid
// Retrieve email configuration from environment variables
const emailConfig = {
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
  from: process.env.FROM_USERNAME,
  recipients: process.env.EMAIL_RECIPIENTS.split(","),
};

// Selector for the portion of the website to compare
const querySelector = process.env.QUERY_SELECTOR;

function hoursToMilliseconds(hours) {
  const milliseconds = hours * 60 * 60 * 1000;
  return milliseconds;
}

// Function to send email
async function sendEmail() {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: emailConfig.from,
    to: emailConfig.recipients,
    subject: "Website Change Detected!",
    text: `The ${
      querySelector ? "specified portion of the website" : "entire website"
    } ${websiteUrl} has changed since the last visit.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Variables to store the previous content
let previousContent = "";

// Function to fetch website content and compare the specified portion or the full DOM
async function checkWebsite() {
  try {
    const response = await axios.get(websiteUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    let currentContent;
    if (querySelector) {
      currentContent = $(querySelector).html();
    } else {
      currentContent = $.html();
    }

    if (
      previousContent &&
      currentContent &&
      previousContent !== currentContent
    ) {
      console.log(
        `Change detected in ${
          querySelector ? "the specified portion" : "the entire DOM"
        }!`
      );
      await sendEmail();
    } else {
      console.log("No change detected.");
    }

    previousContent = currentContent;
  } catch (error) {
    console.error("Error fetching website:", error);
  }
}

// Start checking the website at the specified interval
const checkInterval = hoursToMilliseconds(process.env.CHECK_INTERVAL) || 60000; // Default interval is 1 minute
setInterval(checkWebsite, checkInterval);
