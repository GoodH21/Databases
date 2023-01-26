const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI } = process.env;


/*
 * constants
 */
const client = new MongoClient(MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("workouts").find({}).count();

    if (results) {
        console.info("deleting collection");
        await db.collection("workouts").drop();
    }

    const load = loading("importing workout data").start();

    /*
     * Import the JSON data
     */

    const data = await fs.readFile(path.join(__dirname, "workout.json"), "utf8");
    await db.collection("workouts").insertMany(JSON.parse(data));

    const userData = await fs.readFile(path.join(__dirname, "user.json"), "utf-8");
    await db.collection("users").insertMany(JSON.parse(userData));

    load.stop();
    console.info(
      `Created workout database`
    );


    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}
main();