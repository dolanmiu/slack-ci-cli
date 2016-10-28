const proverbs = require('./proverbs.json');

function getProverb() {
    return proverbs[Math.floor(Math.random() * proverbs.length)];
}