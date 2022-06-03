const fastify = require("fastify")();
const fs = require("fs");

//array of fictitious students

const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];


// Get route and JSON/object reply
/* 
/cit/student: return all students and a 200 status code from the 
students array to be defined in the next part of the lab
*/

fastify.get("/cit/student", (request, reply) => {
    reply
.code(200)
.header("Content-Type", "application/json; charset=utf-8")
.send(students)
});


fastify.get("/cit", (request, reply) => {
reply
.code(200)
.header("Content-Type", "application/json; charset=utf-8")
.send(
{test: "This is a test"}
);
});


/*
/cit/student/:id: return a single student if the student exists based on the id and a 200 status 
code from the students array to be defined in the next part of the lab, or Not Found and a 404 status code.
*/
/*
Recommend using for..of loop with students array to find the correct student by id. 
You will also need convert the id route parameter to an integer, such as by using parseInt().
*/


fastify.get("/cit/student/:id", (request, reply) => {
    //page 29 of wk5 lecture
const{ id } = request.params;
let student = request.params;
for (const item of students){
    if (item.id == parseInt(id)){
        student = item;
break;
    }
}
if (student){
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(student); 
}else{
    if (student){
        reply
        .code(404)
        .header("Content-Type", "text/html; charset=utf-8")
        .send("Not Found");
    }
  }
});

//unmatched route handler
//wildcard route that will capture unmatched route
fastify.get("*", (request, reply) => {
    reply
    .code(404)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("<h1>Unsupported Request :(</h1>");
});

//echo back post
fastify.post("/cit/student", (request, reply) => {
    const { last, first } = request.body; //unused deconstruction
    let students = request.body
    if (last || first) {
    reply
        .code(404)
        .header("Content-Type", "text/html; charset=utf-8")
        .send("Not Found")
    }else{
    //let = id= 0;
    for (const student of students){
        if (student.id > id){
            id = student.id;
        }
    }
id++;
students.push({id, last, first});
reply
.code(200)
.header("Content-Type", "application/json; charset=utf-8")
.send(students[students.length-1]);
}

reply
.code(200)
.header("Content-Type", "application/json; charset=utf-8")
.send(student);
});

/*let obj = { a: 4, b: 0.5 , c: 0.35, d: 5 };

let arr = Object.values(obj);
let min = Math.min(...arr);
let max = Math.max(...arr);

console.log( `Min value: ${min}, max value: ${max}` );
*/

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
if (err) {
console.log(err);
process.exit(1);
}
console.log(`Server listening on ${address}`);
});