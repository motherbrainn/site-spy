# Site Spy

Set env variables to scrape a website at a given interval and compare current scrape to previous. If current !== previous send an email (using sendgrid) to provided addresses. You can compare the entire DOM at a particular URL or pass a query selector to compare a specific portion of the page. I chose sendgrid for email because it gives you 100 free emails per day and gmail is too hard to use now that they dont allow less secure apps.

## Env Variables

WEBSITE_URL: The URL of the website you want to monitor.  
FROM_USERNAME: The email address to be used for sending emails.  
SENDGRID_API_KEY: API Key from sendgrid  
EMAIL_RECIPIENTS: Comma-separated email addresses of the recipients.  
QUERY_SELECTOR: (Optional) The query selector for the specific portion of the website to compare.  
CHECK_INTERVAL: (Optional) The interval (in hours) between website checks.

## Local Docker

To run docker locally:  
`docker build -t site-spy .`  
`docker run -d site-spy`
