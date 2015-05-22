var isArray = Array.isArray;
var renderHTML;
module.exports = renderHTML = function (object) {
        if (typeof object !== "object") return object;

        var open = "<";
        var close = "</";
        
        var content = object.content ? (isArray(object.content) ? object.content : [object.content]) : [];
        var tag = object.tag || "div";
        var isComment = (tag ==="comment");
        if (isComment){
         tag = "--";
            open+="!";
            close="";
        }
        var attrs = object.attrs || {};

        open += tag ;
        close += tag + ">";
        for (var key in attrs) {
            open += " " + key + '="' + attrs[key] + '"';
        }
        if (!isComment) open += ">";
       return open+content.map(renderHTML).join('')+close;
};
var utils = require("./utils");
for (var key in utils){
    module.exports[key]=utils[key];
}