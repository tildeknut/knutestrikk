import express from "express"
import { Server } from "http";
import * as PG from "pg"
//import userRouter from "server.mjs"
const { Client } = PG.default
const userRouter = new express.Router();

userRouter.use(express.json());

import { createHmac } from "crypto";

userRouter.post("/", createUser)
userRouter.post("/login", getUser);
//userRouter.delete("/", deleteUser)

const DB_CREDENTIALS = "postgresql://hannahmatildeknutsdatter@localhost:5432/hannahmatildeknutsdatter"


async function createUser(req, res, next) {

    console.log(req.body);
    const email = req.body.email;
    const name = req.body.name;
    const psw = req.body.password;

    // SQL
    const sqlQuery = `INSERT INTO "public"."users"("email", "navn", "passord") VALUES($1, $2, $3) RETURNING "id", "email", "navn", "passord"`;
    const client = new Client(DB_CREDENTIALS);

    try {
        const hash = createHmac('sha256', psw).digest('hex');
        await client.connect();
        let result = await client.query(sqlQuery, [email, name, hash]);
        console.log(client);

        res.status(200).json(result.rows[0]).end()  // [{id, name, email}]

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Ooops noe virker ikke med serveren " }).end()

    } finally {
        client.end();

    }

}

async function getUser(req, res, next) {
    const email = req.body.email;
    const psw = req.body.password;

    const credentials = {
        connectionString: DB_CREDENTIALS,
        ssl: false
        // NB på server må dette muligens være ssl:{rejectUnauthorized:false}
    };
    // SQL
    const client = new Client(credentials);

    try {
        const hash = createHmac('sha256', psw).digest('hex');
        await client.connect();

        let result = await client.query('SELECT * FROM "public"."users" WHERE "email" = $1 AND "passord" = $2', [email, hash]);
        //let result = await client.query(sqlQuery,[email, hash]); 
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]).end()  // [{id, name, email}]
          
       } else {
       res.status(404).end();
        }
    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Ooops noe virker ikke med serveren " }).end()

    } finally {
        client.end();
    }

}


function deleteUser(req, res, next) { }

export default userRouter;