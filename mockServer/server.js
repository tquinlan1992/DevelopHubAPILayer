var proxy = require('http-proxy-middleware');
var app = require('express')();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/couchdb', proxy({
    target: 'http://127.0.0.1:5984',
    changeOrgin: true,
    pathRewrite: {
        '^/couchdb': ''
    }
}));
app.use('/new', proxy({
    target: 'http://127.0.0.1:3000',
    changeOrgin: true,
    pathRewrite: {
        '^/new': ''
    }
}));

app.listen(8000, () => console.log('Example app listening on port 3000!'));