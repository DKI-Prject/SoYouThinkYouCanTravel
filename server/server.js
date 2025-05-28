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

