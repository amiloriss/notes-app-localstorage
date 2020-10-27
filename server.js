const path = require('path');
const chalk = require('chalk')

const express = require('express')
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

app.use('/', express.static('src'))

app.listen(PORT, ()=>{
    console.log(chalk.blueBright('Server has been started'));
})