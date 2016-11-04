Slack Continuous Integration CLI
=================
> This tool is intended to be used in conjunction with a CI system. 

> When a build is successful, or a failure, simply call the CLI command in your `package.json` or in the command line to push descriptive build notifications to slack!

> No need for complex configuration, fuss with cURL or silly shell scripts.

# Usage
1. Get `incoming-webhook` set up on Slack.
2. Install this plugin with `npm install slack-ci-cli`. Do **not** install this globally, as this plugin scans the current project for a git repo.

You can use this in `package.json` `scripts` or run straight from a command line tool such as `bash`

```shell
slacksuccess --url=[YOUR_SLACK_URL_HERE]
```

```shell
slackbuildfail --url=[YOUR_SLACK_URL_HERE]
```

```shell
slacktestfail --url=[YOUR_SLACK_URL_HERE]
```

```shell
slackdeployfail --url=[YOUR_SLACK_URL_HERE]
```

```shell
slacklintfail --url=[YOUR_SLACK_URL_HERE]
```

You can add the optional `--humour` flag or `-h` to add a bit of flavour to your build messages :)

# Examples
It's generally good to store the Slack URL in a configuration variable if possible.
```shell
slacksuccess --url=$SLACK_URL
```

```shell
slacklintfail --url=$SLACK_URL --humour
```

```shell
slackbuildfail --url=$SLACK_URL -h
```