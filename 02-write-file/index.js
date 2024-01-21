const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filename = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filename);

function writeAnswer(answer) {
  writeStream.write(answer);
}

function handleExit() {
  rl.output.write('\nSee you later.');
  rl.close();
  writeStream.end();
  process.exit();
}

function askQuestionWriteAnswer() {
  rl.output.write('How much is the fish?\n');
  rl.on('line', (answer) => {
    if (answer === 'exit') {
      handleExit();
    } else writeAnswer(answer);
  });
}

rl.on('SIGINT', handleExit);

askQuestionWriteAnswer();
