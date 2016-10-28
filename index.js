const shell = require('shelljs');
const SlackWebhook = require('slack-webhook');
const messages = require('./messages.json');
const proverbs = require('./proverbs.json');

const slack_url = process.env.npm_config_slackUrl;
const errorType = process.env.npm_config_error;
const humour = process.env.npm_config_humour;
const repoSlug = process.env.npm_config_repoSlug;
const isSuccessful = errorType == undefined;

if (!slack_url) {
    process.exit(9);
}

const committerName = shell.exec(`git --no-pager show -s --format="%an"`);
const committerEmail = shell.exec(`git --no-pager show -s --format="%ae"`);
const committerMessage = shell.exec(`git --no-pager show -s --format="%B"`);
const commitHash = shell.exec(`git --no-pager show -s --format="%H"`);
const currentBranch = shell.exec(`git symbolic-ref --short HEAD`);

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
    text: `[${repoSlug}/${currentBranch}] ${committerMessage}`,
    attachments: [{
        color: colour,
        author_name: committerName,
        title: "Commit Details",
        fields: [{
                title: "Hash",
                value: commitHash,
                short: false
            },
            {
                title: "Message",
                value: committerMessage,
                short: false
            },
            {
                title: "Email",
                value: committerEmail,
                short: false
            }
        ],
        footer: "Bitbucket Pipelines"
    }]
});