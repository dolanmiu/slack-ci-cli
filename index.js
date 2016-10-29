const shell = require('shelljs');
const SlackWebhook = require('slack-webhook');
const messages = require('./messages.js');
const proverbs = require('./proverbs.js');

const slack_url = process.env.npm_config_slackUrl;
const errorType = process.env.npm_config_error;
const humour = process.env.npm_config_humour;
// const repoSlug = process.env.npm_config_repoSlug;
const isSuccessful = errorType == undefined;

if (!slack_url) {
    console.warn("No slack URL set. Please set this with the --slackUrl option");
    process.exit(9);
}

const commandReturnValue = shell.echo(`$?`);

const committerName = shell.exec(`git --no-pager show -s --format="%an"`);
const committerEmail = shell.exec(`git --no-pager show -s --format="%ae"`);
const committerMessage = shell.exec(`git --no-pager show -s --format="%B"`);
const commitHash = shell.exec(`git --no-pager show -s --format="%H"`);
const currentBranch = shell.exec(`git symbolic-ref --short HEAD`);
const repoUrl = shell.exec(`git config --get remote.origin.url`);
const repoSlug = repoUrl.substr(repoUrl.lastIndexOf('/') + 1);

let colour;
let slackMessage = '';
switch (errorType) {
    case "test":
        slackMessage = messages.getTestFailMessage(humour);
        colour = "warning";
        break;
    case "build":
        slackMessage = messages.getBuildFailMessage(humour);
        colour = "danger";
        break;
    case "deploy":
        slackMessage = messages.getDeployFailMessage(humour);
        colour = "danger";
        break;
    case undefined:
        slackMessage = messages.getSuccessMessage(humour);
        colour = "good";
        break;
    default:
        colour = "#439FE0";
}

const slack = new SlackWebhook(slack_url);

slack.send({
    text: `[${repoSlug}/${currentBranch}] ${slackMessage}`,
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
        footer: proverbs.getProverb()
    }]
});

process.exit(commandReturnValue);