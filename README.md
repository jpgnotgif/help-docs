# help-docs
This repo houses a slack bot that replies with Recurly documentation urls when provided a topic

## Bootstrapping
1. Clone this repo
2. Get ngrok up and running for local development by following this
   tutorial:
https://api.slack.com/tutorials/tunneling-with-ngrok

3. Edit the `Request URL` field on the slash command page in the app via
   https://api.slack.com/apps/A8A99D6NR/slash-commands?. The url should
be the one labeled under "Forwarding" when you started ngrok

4. Run `npm install`
5. Create a file to house the slack client id
6. Create a file to house the slack secret id
7. Start the server like so:
`SLACK_CLIENT_ID=<app_client_id> SLACK_SECRET_ID=<app_secret_id> npm
start`
