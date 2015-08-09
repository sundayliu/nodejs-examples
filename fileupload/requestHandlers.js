var querystring = require("querystring")
var fs = require("fs");
var formidable = require("formidable");

function start(response, request){
    console.log("[handler start]Request handler `start ` was called");
    
    var body = "<html>" 
        + "<head>"
        + '<meta http-equiv="Content-Type" content="text/html; charset="UTF-8" />'
        + "</head>"
        + "<body>"
        + '<form action="/upload" method="post" enctype="multipart/form-data">'
        + '<input type="file" name="upload" />'
        + '<br />'
        + '<input type="submit" value="upload file" />'
        + '</form>'
        + "</body>"
        + "</html>";
        
        response.writeHead(200, {"Content-Type":"text/html"});
        response.write(body);
        response.end();
}

function upload(response, request){
    console.log("[handler upload]Request handler `upload ` was called");
    
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files){
        console.log("parsing done");
        fs.renameSync(files.upload.path, "d:/cygwin/tmp/test.png");
         response.writeHead(200, {"Content-Type":"text/html"});
         response.write("received image:<br />");
         response.write("<img src='/show' />");
         response.end();
    });
   
}

function show(response, request){
    console.log("[handler show]Request handler 'show' was called");
    fs.readFile("d:/cygwin/tmp/test.png", "binary", function(error, file){
        if (error){
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.write(error + "\n");
            response.end();
        }
        else{
            response.writeHead(200, {"Content-Type":"image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
    
}

exports.start = start;
exports.upload = upload;
exports.show = show;