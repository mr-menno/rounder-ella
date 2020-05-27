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
app.use('/release', (req,res) => res.json({
    commit: (process.env.HEROKU_SLUG_COMMIT||'develop').substr(0,7),
    date: new Date(process.env.HEROKU_RELEASE_CREATED_AT)
}));
app.use('/*', (req,res) => res.sendFile(path.join(__dirname,'build/index.html')))

app.listen(process.env.PORT || 8000, () => {
    console.log(`Express listening on port ${process.env.PORT || 8000}`)
})