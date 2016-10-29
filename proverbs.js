const proverbs = require('./proverbs.json');

var exports = module.exports = {};

exports.getProverb = function() {
    return proverbs[Math.floor(Math.random() * proverbs.length)];
}