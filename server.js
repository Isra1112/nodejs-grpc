const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./helloworld.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const hello_world_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const server = new grpc.Server();

server.addService(hello_world_proto.Greeter.service, {
    SayHello: (_, callback) => {
    callback(null, {message: 'Hello ' + _.request.name});
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:"+port);
    server.start();
  }
);