# BACK-END #

## Ther is a  SQL file in the db folder ##

### Please use the file to generate the database tables in the postgreSQL ###

For  database connection please check the backend/db.js file . Change  the credential as per your local postgresql server.

In the backend  folder <br />
CMD: npm install  <br />
CMD: npm start  <br />

## Server will start on port 5000 ##
 http://localhost:5000/

# Front-End #

go to frontend folder 

CMD : npm install   <br /> <br />
CMD : npm start <br />

Client  will start on port 3030 
### http://localhost:3030/ ###



#API REF: #
## USER ##
POST http://localhost:5000/user  <br />
{email:'email@domain.com'}  

GET http://localhost:5000/user  <br />
Will list all user data  (Record will be Cached ) 

PATCH http://localhost:5000/user/random/:email  <br />
Will add a random offer for the email address :email 

## OFFER ##
POST http://localhost:5000/offer  <br />
{description:'50 GB data for 1 month'}  

GET http://localhost:5000/offer  <br />
Will list all offer  data  (Record will be Cached ) 

PATCH http://localhost:5000/offer/:offer_id  <br />
Will update offer data


## TRANSACTION ##
POST http://localhost:5000/transaction  <br />
{offerId:1,email:'kalam@domain.com'}  

GET http://localhost:5000/transaction  <br />
Will list all transaction  data  (Record will be Cached ) 



# I have skipped the data validation part , i.e. email address #

