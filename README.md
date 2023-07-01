# Site Spy

Set env variables to scrape a website at a given interval and compare current scrape to previous. If current !== previous send an email to provided addresses. You can compare the entire DOM at a particular URL or pass a query selector to compare a specific portion of the page.

## Env Variables
WEBSITE_URL: The URL of the website you want to monitor.  
EMAIL_SERVICE: The email service provider (e.g., Gmail, Outlook).  
EMAIL_USERNAME: The email address to be used for sending emails.  
EMAIL_PASSWORD: The password for the email account.  
EMAIL_RECIPIENTS: Comma-separated email addresses of the recipients.  
QUERY_SELECTOR: (Optional) The query selector for the specific portion of the website to compare.  
CHECK_INTERVAL: (Optional) The interval (in hours) between website checks.  

## Local Docker
To run docker locally:  
`docker build -t site-spy .`  
`docker run -d site-spy`
