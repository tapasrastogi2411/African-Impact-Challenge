export {server, awsServer};

let server = "http://localhost:8080"; // set to development server by default
let awsServer = "http://localhost:8080"; 
if (process.env.NODE_ENV === "production") {
    server = "http://cscc01-aic.herokuapp.com";
    awsServer = "https://aic-assets.s3.ca-central-1.amazonaws.com";
} 



// console.log(process.env.NODE_ENV);

//export const server = findServer;
//export awsServer;
//export const server = "http://cscc01-aic.herokuapp.com";