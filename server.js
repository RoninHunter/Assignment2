// Jeremy Green 
// CEN3031
// Fall 2019


// Getting the http module and saving it to the variable 'http'
var http = require('http'); 
// Getting the file system module and saving it to the variable 'fs'
var fs = require('fs'); 
// Getting the url module and saving it to the variable 'url'
var url = require('url');
// Storing the port number
var port = 8080;




// Object for interpreting and storing json files
var listingData;
// Object for storing our created server
var server;


// [Request] and [Responce] parameters get passed to our anonymous function
// by the HTTP server when it receives a new connection.
// Our requestHandler objects will act as request and response.
var requestHandler = function(request, response) {

  // Storing the parsed and interpreted url in the parsedUrl object 
  var parsedUrl = url.parse(request.url);

  // Note to self below:----------------------------------------------------------
  // console.log(http.METHODS); <<-- Returns list of possible request methods 
  // to be used with request.method one can use such as 
  // GET, POST, HEAD, DELETE, PATCH, PUT, etc.

  // console.log(http.STATUS_CODES); <<-- Returns a list of possible status codes
  // such as '200':'OK' '201':'Created' '202':'Accepted'
  //------------------------------------------------------------------------------

  // If server recieves a request to connect to the '/listings' directory do the following
  if(request.method == 'GET' && parsedUrl.path == '/listings'){

    // Send a responce to the request
    response.writeHead(200, {'Content-Type' : 'application/json'});

    // Writes the body, in this case, our listingData object to HTTP output stream
    response.write(JSON.stringify(listingData));

    // Header and body have been sent, signal server message complete
    response.end();
    
  } else {
    // Send an error responce to the bad request
    response.writeHead(404, {'Content-Type' : 'text/plain'});

    // Send an HTTP string responce to stream output
    response.write('Bad gateway error');

    // Header and body have been sent, signal server message complete
    response.end();
  } 

};

// The readFile method reads file into   
fs.readFile('listings.json', 'utf8', function(err, data) {
 
  // Check for errors
  if(err) throw err;

  // Storing the parsed and interpreted data in the listingData object 
  listingData = JSON.parse(data);

  // Server Created, but not started
  var server = http.createServer(requestHandler);

  // Server now started and is listening for requests on port 8080
  server.listen(port, function() {

    // Confirming Server is listening
    console.log('Server listening on: http:localhost:' + port);
  });


});
