// constants

const {
    MongoClient
} = require('mongodb');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const port = 3000
const uri = "mongodb+srv://brent:mongodeeznutz@cluster0.4su5r5h.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db("BrentSchool");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())
app.use(cors());

// main

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// utility


// routes

app.get('/users', async (req, res) => {
    let users = await _getUsers();
    res.status(200).send(users);
})
//GET//
app.get('/releases', async (req, res) => {
    let releases = await _getReleases();
    res.status(200).send(releases);
});

app.get('/votes', async (req, res) => {
    let votes = await _getVotes();
    res.status(200).send(votes);
});
//POST//
app.post('/users', async (req, res) => {
    try {
        await client.connect();

        const usersColl = database.collection("Users");
        const user = {
            "password": req.body.password,
            "displayname": req.body.displayname,
            "email": req.body.email
        };

        const insertedUser = await usersColl.insertOne(user);

        res.status(201).json({
            status: "Saved",
            message: "User has been saved!",
            data: insertedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
});


app.post('/votes', async (req, res) => {
    try {
        await client.connect();

        const votesColl = database.collection("Votes");
        const vote = {
            "userId": req.body.userId,
            "releaseId": req.body.releaseId
        };

        const insertedVote = await votesColl.insertOne(vote);

        res.status(201).send({
            status: "Saved",
            message: "Vote has been saved!",
            data: insertedVote
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
});

app.post('/releases', async (req, res) => {
    try {
        await client.connect();

        const releasesColl = database.collection("Releases");
        const release = {
            "name": req.body.name,
            "description": req.body.description,
            "date": req.body.date
        };

        const insertedRelease = await releasesColl.insertOne(release);

        res.status(201).json({
            status: "Saved",
            message: "Release has been saved!",
            data: insertedRelease
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
});

//DELETE//
app.delete('/users/:userId', async (req, res) => {
    try {
        await client.connect();

        const usersColl = database.collection("Users");
        const userId = req.params.userId;

        const deletedUser = await usersColl.findOneAndDelete({
            userId: userId
        });

        if (deletedUser.value === null) {
            res.status(404).json({
                error: 'User not found'
            });
        } else {
            res.status(200).json({
                status: "Deleted",
                message: "User has been deleted",
                data: deletedUser.value
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    } finally {
        await client.close();
    }
});


app.delete('/votes/:userId', async (req, res) => {
    try {
        await client.connect();

        const votesColl = database.collection("Votes");
        const userId = req.params.userId;

        const deletedVote = await votesColl.findOneAndDelete({
            userId: userId
        });

        if (deletedVote.value === null) {
            res.status(404).json({
                error: 'Vote not found'
            });
        } else {
            res.status(200).json({
                status: "Deleted",
                message: "Vote has been deleted",
                data: deletedVote.value
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    } finally {
        await client.close();
    }
});

app.delete('/releases/:releaseId', async (req, res) => {
    try {
        await client.connect();

        const releasesColl = database.collection("Releases");
        const releaseId = req.params.releaseId;

        const deletedRelease = await releasesColl.findOneAndDelete({
            releaseId: releaseId
        });

        if (deletedRelease.value === null) {
            res.status(404).json({
                error: 'Release not found'
            });
        } else {
            res.status(200).json({
                status: "Deleted",
                message: "Release has been deleted",
                data: deletedRelease.value
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    } finally {
        await client.close();
    }
});

//PUT//
app.put('/users/:userId', async (req, res) => {
    try {
        await client.connect();

        const usersColl = database.collection("Users");
        const userId = req.params.userId;
        const {
            password,
            displayname,
            email
        } = req.body;

        const result = await usersColl.updateOne({
            userId: userId
        }, {
            $set: {
                password,
                displayname,
                email
            }
        });

        if (result.modifiedCount === 0) {
            res.status(404).json({
                error: 'User not found'
            });
        } else {
            res.status(200).json({
                status: "Updated",
                message: "User has been updated"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    } finally {
        await client.close();
    }
});


app.put('/votes/:userId', async (req, res) => {
    try {
        await client.connect();

        const votesColl = database.collection("Votes");
        const userId = req.params.userId;
        const releaseId = req.body.releaseId;

        console.log(req.params);

        const result = await votesColl.updateOne({
            userId: userId
        }, {
            $set: {
                "releaseId": releaseId
            }
        });

        if (result.modifiedCount === 0) {
            res.status(404).json({
                error: 'Vote not found'
            });
        } else {
            res.status(200).json({
                status: "Updated",
                message: "Vote has been updated"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    } finally {
        await client.close();
    }
});

app.put('/releases/:releaseId', async (req, res) => {
    try {
        await client.connect();

        const releasesColl = database.collection("Releases");
        const releaseId = req.params.releaseId;
        const {
            name,
            description,
            date
        } = req.body;

        const result = await releasesColl.updateOne({
            releaseId: releaseId
        }, {
            $set: {
                name,
                description,
                date
            }
        });

        if (result.modifiedCount === 0) {
            res.status(404).json({
                error: 'Release not found'
            });
        } else {
            res.status(200).json({
                status: "Updated",
                message: "Release has been updated"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    } finally {
        await client.close();
    }
});


// getters

async function _getUsers() {
    try {
        await client.connect();
        let usersColl = database.collection("Users");
        let users = usersColl.find();
        return await users.toArray();
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
}

async function _getVotes() {
    try {
        await client.connect();
        let votesColl = database.collection("Votes");
        let votes = votesColl.find();
        return await votes.toArray();
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
}

async function _getReleases() {
    try {
        await client.connect();
        let releasesColl = database.collection("Releases");
        let releases = releasesColl.find()
        return await releases.toArray();;
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
}



//TEST//