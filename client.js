const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const db = require("./db");
const PROTO_PATH = "./user.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const users_proto = grpc.loadPackageDefinition(packageDefinition);

const client = new users_proto.UserService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);


// client.sayHello({name: 'World'}, function(err, response) {
//     console.log(response.message);
//   });



module.exports = client;