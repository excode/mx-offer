const pool = require("../db");
const VCache = require('../lib/cache');
  exports.insert = (req, res) => {
        const usersData= req.body;
       // console.log(usersData);
        ;(async () => {
        
        const client = await pool.connect()
        try {
            await client.query('BEGIN');
            const queryText = 'INSERT INTO offer(description) VALUES($1)';
            const add = await client.query(queryText, [usersData.description]);
           
            await client.query('COMMIT');
            VCache.resetCache("offer_list");
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
         
            const queryText = 'SELECT * from offer order by id DESC'
            const list = await client.query(queryText)
            VCache.setCache("offer_list",list.rows);
            res.status(201).send(list.rows);
           
        } catch (e) {
          
           // throw e
            res.status(400).send(e);
        } finally {
            client.release()
        }
        })().catch(e =>  res.status(400).send(e.stack))
    
  };
 
  exports.patch = (req, res) => {
    const usersData= req.body;
    const id= req.params.offerId;
    ;(async () => {
        // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const queryText = 'UPDATE offer set description = $1 WHERE  id=$2'
            const updated = await client.query(queryText, [usersData.description,id])
           
            await client.query('COMMIT')
            VCache.resetCache("offer_list");
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
        const id= req.params.offerId;
        ;(async () => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const queryText = 'DELETE FROM offer  WHERE  id=$1'
            const deleted = await client.query(queryText,[id])
           
            await client.query('COMMIT')
            VCache.resetCache("offer_list");
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
  
  