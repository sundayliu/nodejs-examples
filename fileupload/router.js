function route(handle, pathname){
    console.log("[router]About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function'){
        handle[pathname]();
    }
    else{
        console.log("[router]No request handler found for " + pathname);
    }
}

exports.route = route;