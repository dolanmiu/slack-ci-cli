const shell = require('shelljs');
const SlackWebhook = require('slack-webhook');
const messages = require('./messages.json');

const slack_url = process.env.npm_config_slackUrl;
const errorType = process.env.npm_config_error;
const humour = process.env.npm_config_humour;
const isSuccessful = errorType == undefined;

if (!slack_url) {
    process.exit(9);
}

let colour;
switch (errorType) {
    case "test":
        colour = "warning";
        break;
    case "build":
        colour = "danger";
        break;
    case undefined:
        colour = "good";
        break;
    default:
        colour = "#439FE0"
}

const slack = new SlackWebhook(slack_url);

slack.send({
    text: 'some text',
    attachments: [
        // optional attachment data 
    ],
    username: 'new username',
    icon_emoji: ':scream_cat:'
});