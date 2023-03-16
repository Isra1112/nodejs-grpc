const grpc = require("@grpc/grpc-js");
var PROTO_PATH = "./user.proto";
var protoLoader = require("@grpc/proto-loader");
let db = require("./db");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const uid = function(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const users_proto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

server.addService(users_proto.UserService.service, {
  SayHello: (_, callback) => {
    callback(null, { message: 'Hello ' + _.request.name });
  },
  GetAllusers: (_, callback) => {
    callback(null, {users:db});
  },
  AddUser: (call, callback) => {
    let _db = call.request;
    _db.id = uid();
    db.push(_db);
    callback(null, _db);
  },
  UpdateUser: (call, callback) => {
    let _db = call.request;
    let index = db.findIndex((item) => item.id == _db.id);
    db[index] = _db;
    callback(null, _db);
  },
  DeleteUser: (call, callback) => {
    let _db = call.request;
    let index = db.findIndex((item) => item.id == _db.id);
    db.splice(index, 1);
    callback(null, _db);
  }

});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.log(error);
    }
    console.log("Server running at http://127.0.0.1:" + port);
    server.start();
  }
);