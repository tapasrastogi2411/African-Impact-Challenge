
let findServer:any = "http://localhost:8080"; // set to development server by default
if (process.env.NODE_ENV === "production") {
    findServer = "http://cscc01-aic.herokuapp.com";
} 

// console.log(process.env.NODE_ENV);

//export const serverConst = server;
export const server = "http://cscc01-aic.herokuapp.com";