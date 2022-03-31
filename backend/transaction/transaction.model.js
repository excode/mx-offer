const pool = require("../db");
const VCache = require('../lib/cache');
  exports.insert = (req, res) => {
        const usersData= req.body;
        console.log(usersData);
        ;(async () => {
       
        const client = await pool.connect()
        try {
            await client.query('BEGIN');
            const queryText = 'INSERT INTO transaction("email","offerId") VALUES($1,$2) returning id';
            console.log(queryText);
            const add = await client.query(queryText, [usersData.email,usersData.offerId]);

            const queryOfferTaken = 'UPDATE usertbl set "offerTaken"= "offerTaken"+1 where "email" =$1';    // INCREASE  OFFER TAKEN NUMBER
            const updateOffertaken = await client.query(queryOfferTaken,[usersData.email]);
           
            await client.query('COMMIT');
            VCache.resetCache("user_list");
            VCache.resetCache("transaction_list");
            res.status(201).send(add);
        } catch (e) {
            await client.query('ROLLBACK')
            console.log(e);
            res.status(400).send(e);
        } finally {
            client.release()
        }
        })().catch(e =>  res.status(400).send(e))
  };
  
  exports.list = (req, res) => {
    ;(async () => {
       
        const client = await pool.connect()
        try {
         
            const queryText = 'SELECT t.*,o.description from transaction t inner join offer o on o.id = t."offerId" order by t.id DESC'
            const list = await client.query(queryText)
            VCache.setCache("transaction_list",list.rows);
            res.status(201).send(list.rows);
           
        } catch (e) {
            console.log(e);
           // throw e
            res.status(400).send(e);
        } finally {
            client.release()
        }
        })().catch(e =>  res.status(400).send(e.stack))
    
  };
 
  exports.patch = (req, res) => {
    const usersData= req.body;
    const id= req.params.transactionId;
    ;(async () => {
        
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const queryText = 'UPDATE transaction set "email" = $1,"offerId"=$2 WHERE  id=$3'
            const updated = await client.query(queryText, [usersData.email,usersData.offerId,id])
           
            await client.query('COMMIT')
            VCache.resetCache("transaction_list");
            res.status(201).send(updated);
        } catch (e) {
            await client.query('ROLLBACK')
            //throw e
            res.status(400).send(e);
        } finally {
            client.release()
        }
        })().catch(e => res.status(400).send(e.stack))
  
  };
 
  exports.removeById = (req, res) => {
     
        const id= req.params.transactionId;
        ;(async () => {
        const client = await pool.connect()
        console.log("DELETING TRANSACTION");
        try {
            
            const transactionText = 'SELECT *  FROM transaction  WHERE  id=$1';
            const transactionData = await client.query(transactionText,[id]);
            //console.log(transactionData.rows);
            if(transactionData.rows.length>0){
               // console.log(transactionData.rows);
                const email = transactionData.rows[0].email;
                console.log(email);
                await client.query('BEGIN')
                
                const queryText = 'DELETE FROM transaction  WHERE  id=$1'
                const deleted = await client.query(queryText,[id])
                
                const queryOfferTaken = 'UPDATE usertbl set "offerTaken"= "offerTaken"-1 where email=$1';
                const updateOffertaken = await client.query(queryOfferTaken,[email]);  // DEDUCT OFFER TAKEN NUMBER

                await client.query('COMMIT')
                VCache.resetCache("transaction_list");
                res.status(201).send(deleted);
            }else{
                es.status(400).send({error:'invalid_record'}); 
            }
        } catch (e) {
            await client.query('ROLLBACK')
           // throw e
            res.status(400).send(e);
        } finally {
            client.release()
        }
        })().catch(e => res.status(400).send(e.stack))
  };
  
  