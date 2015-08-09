var formidable = require('formidable');
var http = require('http');
var util = require('util');

http.createServer(function(request, response){
    if (request.url == '/upload' && request.method.toLowerCase() == 'post'){
        var form = new formidable.IncomingForm();
        form.parse(request, function(err, fields, files){
            response.writeHead(200, {"Content-Type":"text/plain"});
            response.write("received upload:\n\n");
            response.end(util.inspect({fields:fields, files:files}));
        });
        return;
    }
    
    // show a file upload form
    var body = '<form action="/upload" enctype="multipart/form-data" method="post">'
        + '<input type="text" name="title" /><br />'
        + '<input type="file" name="upload" multiple="multiple" /><br />'
        + '<input type="submit" value="Upload" />'
        + '</form>';
    response.writeHead(200, {"Content-Type":"text/html"});
    response.end(body);
}).listen(9999);