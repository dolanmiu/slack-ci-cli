const proverbs = require('./proverbs.json');

function getRandomProverb() {
    return proverbs[Math.floor(Math.random() * proverbs.length)];
}