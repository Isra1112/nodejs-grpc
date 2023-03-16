const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./helloworld.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const hello_world_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const client = new hello_world_proto.Greeter(
    "localhost:50051",
    grpc.credentials.createInsecure()
);


client.sayHello({name: 'World'}, function(err, response) {
    console.log(response.message);
  });