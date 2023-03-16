const client = require("./client");
const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
    client.GetAllusers({}, (err, users) => {
        res.json(users);
    });
});

app.post('/users/save', (req, res) => {
    client.AddUser(
        {
            id: req.body.id,
            name: req.body.name,
            age: req.body.age,
        },
        (error, users) => {
            res.json({ data: users, msg: "Successfully created a users." });
        }
    );
});

app.post('/users/update', (req, res) => {
    client.UpdateUser(
        {
            id: req.body.id,
            name: req.body.name,
            age: req.body.age,
        },
        (error, users) => {
            res.json({ data: users, msg: "Successfully updated a users." });
        }
    );
});

app.post('/users/remove', (req, res) => {
    client.DeleteUser(
        {
            id: req.body.id,
            name: req.body.name,
            age: req.body.age,
        },
        (error, users) => {
            res.json({ msg: "Successfully removed a users." });
        }
    );
});


app.listen(3014, () => {
    console.log("Server is listening on port 3014");
});






// const handleRequest = (request, response) => {
//     const url = request.url.split("/");
//     const method = request.method;
//     // console.log(url);
//     switch (method) {
//         case 'GET':
//             if (url[1] == 'users') {
//                 client.GetAllusers({}, (err, users) => {
//                     console.log(users);
//                     response.writeHead(200, { "Content-Type": "application/json" });
//                     response.write(JSON.stringify(users));
//                     response.end();
//                 });
//             }
//             break;
//         case "POST":
//             const chunks = [];
//             request.on('data', chunk => chunks.push(chunk));
//             request.on('end', () => {
//                 const data = Buffer.concat(chunks);
//                 console.log('Data: ', data);
//             })
//             client.AddUser(
//                 {
//                     // id: request.body.id,
//                     // name: request.body.name,
//                     // age: request.body.age,
//                 },
//                 (error, users) => {
//                     response.writeHead(200, { "Content-Type": "application/json" });
//                     response.end({ data: users, msg: "Successfully created a users." });
//                 }
//             );
//             break;

//         default:
//             break;
//     }
// }

// const server = http.createServer(handleRequest);
// server.listen(3014, () => {
//     console.log("Server is listening on port 3014");
// });