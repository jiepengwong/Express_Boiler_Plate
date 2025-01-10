commands
- npm start
- docker build -t database-image .
- docker run -d -p 3306:3306 --name express-sql database-image


todos
- docker setup for mysql db
- serialize ORM for express
- mongoost ORM
- integrate docker mysql with express
- authentication jwt setup
- Pagination setup


common docker commands list
- 


TOKEN secret string on node
require('crypto').randomBytes(64).toString('hex')