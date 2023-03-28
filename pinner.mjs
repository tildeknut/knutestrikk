import express from "express"
import { Server } from "http";
import * as PG from "pg"

const { Client } = PG.default
const pinneRouter = new express.Router();


pinneRouter.use(express.json());


pinneRouter.post("/");


//const DB_CREDENTIALS = "postgresql://hannahmatildeknutsdatter@localhost:5432/hannahmatildeknutsdatter"
//const DB_CREDENTIALS = process.env.DATABASE_URL;

const database_url = process.env.DATABASE_URL || "postgres://wgeokickfgglaw:9ce56de2bac6847bf085e67c0fdefa11b0b3375ce287e9a333d65f19f2b7180c@ec2-52-215-68-14.eu-west-1.compute.amazonaws.com:5432/d6pf32ovcef6qm";

export const DB_CREDENTIALS = {
    connectionString: database_url,
    ssl: {
        rejectUnauthorized: false
    }
}

async function collectPinne(req, res, next) {

    console.log(req.body);
    const size = req.body.size;
    const length = req.body.length;

    // SQL
    const sqlQuery = `INSERT INTO "public"."pinner"("size", "length") VALUES($1, $2) RETURNING "id", "size", "length"`;
    const client = new Client(DB_CREDENTIALS);

    try {
        await client.connect();
        let result = await client.query(sqlQuery, [size, length]);
        console.log(client);

        res.status(200).json(result.rows[0]).end()  // [{id, name, email}]

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Ooops noe virker ikke med serveren " }).end()

    } finally {
        client.end();

    }

}

export default pinneRouter;