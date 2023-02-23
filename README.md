# posts


## Github
* to have commit smoothly, go to settings -> developer settings -> personal access token -> generate new one and paste in as password when run git push origin branch 


### Start
* Connect db to port 5423 on postgres
  * Create tables if not existed at `postgres` database, they are created. 
  * There are models like users posts, there is a module connection define as connection. At router, you import connection, and use connection to connect with each model based on routes hits. On running server, server would check connection module first, then create all models (dbs) connected to it at routes or other places
  * 


### PostgreSQL
```bash
brew info postgres
```
* Postgresql command line
```bash
\c DBNAME   -> switch dbs
\l          -> list of databases
\dt         -> show all tables
select * from "Users";   -> show table
```
* To get max number of people in each country, use group by country, select Max(anyAttribute) and order by ... DESC
* docker tag app_image infroger/app_image:1
* 