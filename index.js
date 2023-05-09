const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());

app.post('/command', (req, res) => {
  const { command } = req.body;
  executeCommand(command, (output) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(output);
  });
});

function executeCommand(command, callback) {
  const [cmd, ...args] = command.split(/\s+/);
  const childProcess = spawn(cmd, args);
  let output = '';
  childProcess.stdout.on('data', (data) => {
    output += data;
  });
  childProcess.stderr.on('data', (data) => {
    output += data;
  });
  childProcess.on('exit', (code) => {
    callback(output);
  });
}
app.get('/', (req, res) => {
  res.send('homepage');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
