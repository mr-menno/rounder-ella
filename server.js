const path = require('path');
const express = require('express');
// const bodyparser = require('body-parser');
// var jsforceAjaxProxy = require('jsforce-ajax-proxy');

//express app
let app = express();
// app.use(bodyparser.json())

app.enable('trust proxy');
// app.all('/proxy/?*', jsforceAjaxProxy({ enableCORS: true }));

app.use('/', express.static(path.join(__dirname,'build')));
app.use('/dyno', (req,res) => res.sendFile('/etc/heroku/dyno'))
app.use('/*', (req,res) => res.sendFile(path.join(__dirname,'build/index.html')))

app.listen(process.env.PORT || 8000, () => {
    console.log(`Express listening on port ${process.env.PORT || 8000}`)
})