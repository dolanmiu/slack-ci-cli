const shell = require('shelljs');
const SlackWebhook = require('slack-webhook');
const messages = require('./messages.js');
const proverbs = require('./proverbs.js');
const commandLineArgs = require('command-line-args')

var exports = module.exports = {};

exports.writeToSlack = function(errorType) {
    const optionDefinitions = [
        { name: 'humour', alias: 'h' },
        { name: 'url', type: String },
    ]

    const options = commandLineArgs(optionDefinitions)
    const isSuccessful = errorType == undefined;

    if (!options.url) {
        console.warn("No slack URL set. Please set this with the --url option");
        process.exit(9);
    }

    const commandReturnValue = shell.exec(`echo $?`);

    const committerName = shell.exec(`git --no-pager show -s --format="%an"`);
    const committerEmail = shell.exec(`git --no-pager show -s --format="%ae"`);
    const committerMessage = shell.exec(`git --no-pager show -s --format="%B"`);
    const commitHash = shell.exec(`git --no-pager show -s --format="%H"`);
    const currentBranch = shell.exec(`git symbolic-ref --short HEAD`).trim();
    const repoUrl = shell.exec(`git config --get remote.origin.url`);
    const repoSlug = repoUrl.substring(repoUrl.lastIndexOf('/') + 1, repoUrl.length - 5).trim();

    let colour;
    let slackMessage = '';
    switch (errorType) {
        case "test":
            slackMessage = messages.getTestFailMessage(options.humour);
            colour = "warning";
            break;
        case "build":
            slackMessage = messages.getBuildFailMessage(options.humour);
            colour = "danger";
            break;
        case "deploy":
            slackMessage = messages.getDeployFailMessage(options.humour);
            colour = "danger";
            break;
        case "lint":
            slackMessage = messages.getLintFailMessage(options.humour);
            colour = "warning";
            break;
        case undefined:
            slackMessage = messages.getSuccessMessage(options.humour);
            colour = "good";
            break;
        default:
            colour = "#439FE0";
    }

    const slack = new SlackWebhook(options.url);

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
    }).then(function(res) {
        console.log(res);
        process.exit(commandReturnValue);
    }).catch(function(err) {
        console.warn(err);
        process.exit(1);
    });
}