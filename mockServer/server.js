var proxy = require('http-proxy-middleware');
var app = require('express')();
var resources = require('../api.json');
resources = resources.filter(resource => {
    return resource.type === "proxy";
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function setupProxy(useEndpoint, target) {
    var pathRewrite = {};
    var pathRewriteValue = `^${useEndpoint}`;
    pathRewrite[pathRewriteValue] = '';
    console.log('pathRewrite', pathRewrite);
    app.use(useEndpoint, proxy({
        target,
        changeOrgin: true,
        pathRewrite
    }));
}

resources.forEach(resource => {
    setupProxy(resource.path, resource.target);
});


app.listen(8000, () => console.log('Example app listening on port 3000!'));