var proxy = require('http-proxy-middleware');
var app = require('express')();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function setupProxy(useEndpoint, target) {
    var pathRewrite = {};
    var pathRewriteValue = `^${useEndpoint}`;
    pathRewrite[pathRewriteValue] = '';
    app.use(useEndpoint, proxy({
        target,
        changeOrgin: true,
        pathRewrite
    }));
}

app.use('/couchdb', proxy({
    target: 'http://127.0.0.1:5984',
    changeOrgin: true,
    pathRewrite: {
        '^/couchdb': ''
    }
}));
setupProxy('/couchdb', 'http://127.0.0.1:5984');
setupProxy('/lambdas', 'http://127.0.0.1:3000');


app.listen(8000, () => console.log('Example app listening on port 3000!'));