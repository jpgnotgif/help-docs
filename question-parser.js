const fs = require('fs');
const _ = require('underscore');
const topics = JSON.parse(fs.readFileSync('./topics.json', 'utf8'));

function questionParser(question) {
  // Removes everything except alphanumeric characters and whitespace, then collapses multiple adjacent characters to single spaces.
  const questionWords = question.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase().split(' ');
  let bestCount = 0;
  let bestMatch;
  for (const key in topics) {
    const endpoint = key.toLowerCase().split(' ');
    const currentIntersection = _.intersection(endpoint, questionWords)
    const currentCount = currentIntersection.length
    if (currentCount > bestCount) {
      bestCount = currentCount;
      bestMatch = topics[key];
    };
  }
  return bestMatch;
}

module.exports = questionParser;
