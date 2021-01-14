//app is the entry point of the application
var http = require('http')
var url = require('url')
var filesystem = require('fs')

http.createServer(function(request, response){
    var pathName = url.parse(request.url).pathname
    var fileName = "index.html"

    filesystem.readFile(fileName, callBack)

    function callBack(err, data){
        if(err){
            console.log(err);
            response.writeHead(400, {'Content-Type':'text/html'})
            response.write('<!DOCTYPE><html><body><div>Page not found.... sorry......</div></body></html>')
        }
        else{
            //If the file is present!
            //http header
            response.writeHead(200, {'Content-Type':'text/html'})

            response.write(data.toString())
        }
        //send a response to the body of the html
        response.end()
    }

}).listen(3000)

console.log('Server is running on port 3000')