const shell = require('shelljs');
const SlackWebhook = require('slack-webhook');
const messages = require('./messages.json');
const proverbs = require('./proverbs.json');

const slack_url = process.env.npm_config_slackUrl;
const errorType = process.env.npm_config_error;
const humour = process.env.npm_config_humour;
const isSuccessful = errorType == undefined;

if (!slack_url) {
    process.exit(9);
}

const committerName = shell.exec(`git --no-pager show -s --format="%an"`);
const committerEmail = shell.exec(`git --no-pager show -s --format="%ae"`);
const committerMessage = shell.exec(`git --no-pager show -s --format="%B"`);
const commitHash = shell.exec(`git --no-pager show -s --format="%H"`);

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
    text: "['"$BITBUCKET_REPO_SLUG"'/'"$BITBUCKET_BRANCH"'] '"$MESSAGE"'", 
    attachments:[
        {
            color:"'"$COLOUR"'" , 
            author_name: "'"$COMMITTER_NAME"'",
            title: "Commit Details",
            fields: [
                {
                    title: "Hash",
                    value: "'"$BITBUCKET_COMMIT"'",
                    short: false
                },
                {
                    title: "Message",
                    value: "'"$COMMIT_MESSAGE"'",
                    short: false
                },
                {
                    title: "Email",
                    value: "'"$COMMITTER_EMAIL"'",
                    short: false
                }
            ],
            footer: "Bitbucket Pipelines"
        }
    ]
});