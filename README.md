# Site Spy

WEBSITE_URL: The URL of the website you want to monitor.
EMAIL_SERVICE: The email service provider (e.g., Gmail, Outlook).
EMAIL_USERNAME: The email address to be used for sending emails.
EMAIL_PASSWORD: The password for the email account.
EMAIL_RECIPIENTS: Comma-separated email addresses of the recipients.
QUERY_SELECTOR: (Optional) The query selector for the specific portion of the website to compare.
CHECK_INTERVAL: (Optional) The interval (in hours) between website checks.

To run docker locally
docker build -t site-spy .
docker run -d site-spy
