const messages = require('./messages.json');

exports.getRandomMessage = function(array) {
    return array[Math.floor(Math.random() * array.length)];
}

exports.getSuccessMessage = function(isRandom) {
    if (!isRandom) {
        return messages.success[0];
    }
    return getRandomMessage(messages.success);
}

exports.getTestFailMessage = function(isRandom) {
    if (!isRandom) {
        return messages.fail.test[0];
    }
    return getRandomMessage(messages.fail.test);
}

exports.getBuildFailMessage = function(isRandom) {
    if (!isRandom) {
        return messages.fail.build[0];
    }
    return getRandomMessage(messages.fail.build);
}

exports.getDeployFailMessage = function(isRandom) {
    if (!isRandom) {
        return messages.fail.deploy[0];
    }
    return getRandomMessage(messages.fail.deploy);
}