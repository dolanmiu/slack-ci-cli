const messages = require('./messages.json');

function getRandomMessage(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getSuccessMessage(isRandom) {
    if (!isRandom) {
        return messages.success[0];
    }
    return getRandomMessage(messages.success);
}

function getTestFailMessage(isRandom) {
    if (!isRandom) {
        return messages.fail.test[0];
    }
    return getRandomMessage(messages.fail.test);
}

function getBuildFailMessage(isRandom) {
    if (!isRandom) {
        return messages.fail.build[0];
    }
    return getRandomMessage(messages.fail.build);
}

function getDeployFailMessage(isRandom) {
    if (!isRandom) {
        return messages.fail.deploy[0];
    }
    return getRandomMessage(messages.fail.deploy);
}