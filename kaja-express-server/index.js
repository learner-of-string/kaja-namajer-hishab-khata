const express = require("express");
const cors = require("cors");
require("dotenv").config();

//initiate express app
const app = express();
const port = process.env.port || 3000;

// middleware
app.use(
    cors({
        origin: [
            "https://registry-of-kaja-namaj.web.app",
            "http://localhost:5173",
        ],
    })
);
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.db_uri;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        // db and collections
        const db = client.db("kajaNamaz");
        const kajaCollection = db.collection("namazHistory");

        app.get("/namaz/missed", async (req, res) => {
            // Access data from the query string
            const userIdentity = req.query.userIdentity;
            const missedNamaz = await kajaCollection.findOne({
                userEmail: userIdentity,
            });
            res.send(missedNamaz);
        });

        app.get("/namaz/missed/:wakto", async (req, res) => {
            const userIdentity = req.query.userIdentity;
            const wakto = req.params.wakto;
            const currentValueForMissed = await kajaCollection.findOne({
                userEmail: userIdentity,
            });
            const result = currentValueForMissed.namazCounts.find(
                (eachNamaz) => eachNamaz.namazName === wakto
            );
            res.send(result);
        });

        app.post("/update/namaz", async (req, res) => {
            const { userEmail, namazName, regular, qasr } = req.body;
            const filter = { userEmail, "namazCounts.namazName": namazName };
            const updatedDoc = {
                $set: {
                    "namazCounts.$.regular": regular,
                    "namazCounts.$.qasr": qasr,
                },
            };
            const result = await kajaCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });

        app.post("/user/initiate", async (req, res) => {
            const newUserInfo = req.body;
            const isUserNew = await kajaCollection.findOne({
                userEmail: newUserInfo.userEmail,
            });
            if (!isUserNew) {
                const result = await kajaCollection.insertOne(newUserInfo);
                res.send(result);
            }
            if (isUserNew?.userEmail === newUserInfo?.userEmail) {
                res.send({ message: `User Already exists` });
            }
        });

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send(`Namaz is missing due to: ${port}`);
});

app.listen(port, () => console.log(`Namaz is missing due to: ${port}`));
