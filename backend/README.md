npm init -y

npm install express body-parser

create server.js file

npm start (basic nodejs server is up and running now)

http://localhost:4000/ (Will give response as Welcome to blogpost)

added post api to create posts

http://localhost:4000/api/posts (POST API)
Body => { "postName": "Docker", "description": "This is about Docker" }
Response => {
  "id": 1712298017716,
  "postName": "Docker",
  "description": "This is about Docker"
}
Status: 201 Created
Size: 77 Bytes
Time: 36 ms

