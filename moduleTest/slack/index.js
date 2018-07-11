// #92_payment_partner channel
function createSlack(webhookUrl) {
    const slack = new Slack();
    slack.webhook = tfy(slack.webhook);
    slack.setWebhook(webhookUrl);
    return slack;
}

const successSlack = createSlack(successSlackWebHookURL);
