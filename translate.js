/* eslint-disable no-console */
const fs = require('fs');

const args = process.argv.slice(2);
console.log('🚀 ~ file: translate.js:5 ~ args:', args.length);
if (args.length !== 4) {
  console.log('❌ Usage: node cli.js <key> <value1> <value2> filename');
  process.exit(1);
}

const [translationKey, value1, value2, file] = args;

const file1 = `${process.cwd()}/public/locales/en/${file}.json`;
const file2 = `${process.cwd()}/public/locales/ar/${file}.json`;

function writeToJsonFile(filename, key, value) {
  let data = {};
  if (fs.existsSync(filename)) {
    const rawData = fs.readFileSync(filename, 'utf-8');
    data = JSON.parse(rawData);
  }
  data[key] = value;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

writeToJsonFile(file1, translationKey, value1);
writeToJsonFile(file2, translationKey, value2);

console.log(`Data written successfully. ${translationKey}`);
