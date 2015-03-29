var isArray = require("util").isArray,
    async = require("async");
var renderHTML;
module.exports = renderHTML = function (object, callback) {
    setTimeout(function () {
        if (typeof object !== "object") return callback(object);

        var open = "<";
        var close = "</";
        var content = object.content ? (isArray(object.content) ? object.content : [object.content]) : [];
        var tag = object.tag || "div";
        var attrs = object.attrs || {};

        open += tag + "";
        close += tag + ">";
        for (var key in attrs) {
            open += " " + key + '="' + attrs[key] + '"';
        }
        open += ">";
        var tasks = content.map(function (con) {
            return function (cb) {
                renderHTML(con, function (html) {
                    cb(null, html);
                });
            }
        });
        async.parallel(tasks, function (err, contentHTML) {
            open += contentHTML;
            callback(open + close);
        });
    }, 0);
};

if (module.parent === null) {
    console.time("Compile");
    var object = {
        tag: "h1",

        content: "Hello, world"
    };
    module.exports(object, function () {
        console.timeEnd("Compile");
    });
}