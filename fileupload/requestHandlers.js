function start(){
    console.log("[handler start]Request handler `start ` was called");
}

function upload(){
    console.log("[handler upload]Request handler `upload ` was called");
}

exports.start = start;
exports.upload = upload;