const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const mongodb_uri = process.env.MONGODB_URI;
const db = process.env.DB;
const collection1 = process.env.COLLECTION1;
const collection2 = process.env.COLLECTION2;
const collection3 = process.env.COLLECTION3;
const collection4 = process.env.COLLECTION4;

const PORT = 3000;
const app = express();
const client = new MongoClient(mongodb_uri);

app.use(cors());
app.use(express.json());


app.get("/beaches", async (request, response)=>{
    try {
        const database = await client.db(db);
        const coll = await database.collection(collection1); //may use request instead of collection
        const data = await coll.find().toArray();
        response.status(200).send(data);

    } catch(error) {
        console.error(`CODE MACHINE BROKE: ERROR ${error}`)
    }
});

app.get("/mountains", async (request, response)=>{
    try {
        const database = await client.db(db);
        const coll = await database.collection(collection2); //may use request instead of collection
        const data = await coll.find().toArray();
        response.status(200).send(data);

    } catch(error) {
        console.error(`CODE MACHINE BROKE: ERROR ${error}`)
    }
});

app.get("/nature", async (request, response)=>{
    try {
        const database = await client.db(db);
        const coll = await database.collection(collection3); //may use request instead of collection
        const data = await coll.find().toArray();
        response.status(200).send(data);

    } catch(error) {
        console.error(`CODE MACHINE BROKE: ERROR ${error}`)
    }
});

app.get("/parks", async (request, response)=>{
    try {
        const database = await client.db(db);
        const coll = await database.collection(collection4); //may use request instead of collection
        const data = await coll.find().toArray();
        response.status(200).send(data);

    } catch(error) {
        console.error(`CODE MACHINE BROKE: ERROR ${error}`)
    }
});




app.listen(PORT, ()=>{
    console.log(`Server is now listening on Port: ${PORT}`)
});
