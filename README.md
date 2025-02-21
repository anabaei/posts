# posts


## Github
* to have commit smoothly, go to settings -> developer settings -> personal access token -> generate new one and paste in as password when run git push origin branch 


### Start
* Connect db to port 5423 on postgres
  * Create tables if not existed at `postgres` database, they are created. 
  * There are models like users posts, there is a module connection define as connection. At router, you import connection, and use connection to connect with each model based on routes hits. On running server, server would check connection module first, then create all models (dbs) connected to it at routes or other places
  * 


## Debug
* install remote container
* select New Dev Container
  * Select Node.js & Postgresql
    * It creates docker-compose which run node first, then create a postgres from image
    * You can add command section at then end

* Create launch.json as below using nodemon
```javascript
{
    "version": "0.2.0",
    "configurations": [
    
        {
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "name": "nodemon",
            "program": "${workspaceFolder}/server.js",
            "request": "launch",
            "restart": true,
            "runtimeExecutable": "nodemon",
            "skipFiles": [
                "<node_internals>/**"
            ]
        }
    ]
}
```

### PostgreSQL Get into Container
```bash
brew info postgres
```
* Postgresql command line
* When running on container then use this to access postgres
```bash
sudo apt-get update
sudo apt-get install -y postgresql-client
psql -h localhost -U postgres -d postgres 
```
* 
```bash
\c DBNAME   -> switch dbs
\l          -> list of databases
\dt         -> show all tables
select * from "Users";   -> show table
```
* To get max number of people in each country, use group by country, select Max(anyAttribute) and order by ... DESC
* docker tag app_image infroger/app_image:1


#### APIs

#### users
* http://localhost:3001/users
```bash
POST
{
	"name": "Amir khan",
  "email": "amir@gmail.com"
  "bio": ""
}
GET
PUT, to replace the whole resource. several puts is same as one single put
PATH, partialy update resource. several path are different
```

#### posts
* http://localhost:3001/posts
```bash
POST
{
	"name": "Amir khan",
  "email": "amir@gmail.com"
  "bio": ""
}
GET
PUT, to replace the whole resource. several puts is same as one single put
PATH, partialy update resource. several path are different
```
#### comments
* posts/:PostId/comments
```bash
POST
{
	"title": "aa",
  "content": "amir@gmail.com"
  "postid": ""
  "like": ""
  "dislike": ""
  "ipaddress": ""
  "city": ""
  country: ""
}
GET /posts/:PostId/comments
# Comments on Comments
post /posts/:postId/comments/:commentid

```

### Config
* install dotenv and run  
```javascript
config()
```
* Then inside  `process.env` you access the `.env` variables 

## Docker in Container 
* To run docker inside container for mac m1
```bash
 curl -sSL https://get.docker.com/ | sudo sh
# to check if exist and run
$ sudo apt-get update && sudo apt-get upgrade
```

### DB

```javascript
psql -U amir -d postgres
psql postgres://amir@localhost:5432/postgres2
CREATE ROLE postgres WITH LOGIN PASSWORD 'password';
GRANT USAGE, SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO postgres;

```