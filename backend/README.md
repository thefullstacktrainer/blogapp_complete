npm init -y

npm install express body-parser

create server.js file

npm start (basic nodejs server is up and running now)

http://localhost:4000/ (Will give response as Welcome to blogpost)

added post api to create posts

Test in Thunderclient/Postman

1. http://localhost:4000/api/posts (POST API)
Body => { "postName": "Docker", "description": "This is about Docker" }
Response => {
  "id": 1712298229583,
  "postName": "Docker",
  "description": "This is about Docker"
}
Status: 201 Created
Size: 77 Bytes
Time: 36 ms

2. http://localhost:4000/api/posts (GET API)
Response =>
[
  {
    "id": 1712298229583,
    "postName": "Docker",
    "description": "This is about Docker"
  }
]
Status: 200 OK
Size: 79 Bytes
Time: 7 ms

3. http://localhost:4000/api/posts/1712298229583 (GET API)
Response =>
{
  "id": 1712298229583,
  "postName": "Docker",
  "description": "This is about Docker"
}
Status: 200 OK
Size: 77 Bytes
Time: 5 ms

4. http://localhost:4000/api/posts/1712298229583 (PUT API)
Body => {"postName":"Docker","description":"This is about Docker Updated"}
Response =>
{
  "id": 1712298229583,
  "postName": "Docker",
  "description": "This is about Docker Updated"
}
Status: 200 OK
Size: 84 Bytes
Time: 7 ms

5. http://localhost:4000/api/posts/1712298229583 (DELETE API)
Response =>
{
  "message": "Post deleted successfully"
}

6. http://localhost:4000/api/posts/1712298229583 (DELETE API called again) 
Response =>
{
  "message": "Post not found"
}

