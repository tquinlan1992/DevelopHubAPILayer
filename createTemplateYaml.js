var resources = require('./api.json');
resources = resources.filter(resource => {
    return resource.type === "lambda";
});
var YAML = require('json2yaml')

var template = {
    "AWSTemplateFormatVersion": "2010-09-09",
    "Transform": "AWS::Serverless-2016-10-31",

    "Description": "An example RESTful service",
    "Resources": {
        "ExampleFunction": {
            "Type": "AWS::Serverless::Function",
            "Properties": {
                "Runtime": "nodejs6.10",
                "Handler": "index.handler",
                "Events": {
                    "RootDeveloperHub": {
                        "Type": "Api",
                        "Properties": {
                            "Path": "/new",
                            "Method": "any"
                        }
                    }
                }
            }
        }
    }
};

resources.forEach(resource => {
    template.Resources[
        resource.function
    ] = {
            "Type": "AWS::Serverless::Function",
            "Properties": {
                "Runtime": "nodejs6.10",
                "Handler": resource.handler,
                "Events": {
                    "RootDeveloperHub": {
                        "Type": "Api",
                        "Properties": {
                            "Path": resource.path,
                            "Method": "any"
                        }
                    }
                }
            }
        }
});

var yamlTemplate = YAML.stringify(template);

console.log(yamlTemplate);
