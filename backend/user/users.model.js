const pool = require("../db");
const VCache = require('../lib/cache');
  exports.insert = (req, res) => {
        const usersData= req.body;
        console.log(usersData);
        ;(async () => {
        // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await pool.connect()
        try {
            await client.query('BEGIN');
            const queryText = 'INSERT INTO usertbl(email) VALUES($1) returning id';
            const add = await client.query(queryText, [usersData.email]);
           
            await client.query('COMMIT');
            VCache.resetCache("user_list");
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
        // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await pool.connect()

        try {
         
            const queryText = 'SELECT * from usertbl order by id DESC'
            const list = await client.query(queryText)
            VCache.setCache("user_list", list.rows);
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
    const id= req.params.userId;
    ;(async () => {
        // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const queryText = 'UPDATE usertbl set email = $1 WHERE  id=$2'
            const updated = await client.query(queryText, [usersData.email,id])
           
            await client.query('COMMIT')
            VCache.resetCache("user_list");
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
      // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const id= req.params.userId;
        ;(async () => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const queryText = 'DELETE FROM usertbl  WHERE  id=$1'
            const deleted = await client.query(queryText,[id])
           
            await client.query('COMMIT')
            VCache.resetCache("user_list");
            res.status(201).send(deleted);
        } catch (e) {
            await client.query('ROLLBACK')
           // throw e
            res.status(400).send(e);
        } finally {
            client.release()
        }
        })().catch(e => res.status(400).send(e.stack))
  };
  
  exports.randomOffer = (req, res) => {
    const email= req.params.email;
    console.log(email);
    ;(async () => {
   
    const client = await pool.connect()
    try {
        const randomOffer = 'SELECT *  FROM offer order by random() limit 1';
        const offerData = await client.query(randomOffer);
        const offerId = offerData.rows[0].id;
        await client.query('BEGIN');
        const queryText = 'INSERT INTO transaction("email","offerId") VALUES($1,$2) returning id';
        console.log(queryText);
        const add = await client.query(queryText, [email,offerId]);

        const queryOfferTaken = 'UPDATE usertbl set "offerTaken"= "offerTaken"+1 where "email" =$1';    // INCREASE  OFFER TAKEN NUMBER
        const updateOffertaken = await client.query(queryOfferTaken,[email]); 
       
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