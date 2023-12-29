const express = require('express');
const mongoose = require('mongoose');
const { addUser, getUserByUsernameAndPassword } = require('./CrudOperations');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/success.html');
});

app.get('/LoginCSS', (req, res) => {
    res.sendFile(__dirname + '/style.css');
});

(async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb://localhost:27017/CrudDatabase", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        app.post('/login', async (req, res) => {
            const { username, password } = req.body;
            try {
                let user = await getUserByUsernameAndPassword(username, password);
                console.log(user);

                if (user && user.username === username && user.password === password) {
                    res.send('/success');
                } else {
                    res.send("Failed");
                }
            } catch (error) {
                console.error("Error during login:", error);
                res.status(500).send("Internal Server Error");
            }
        });

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.log("Connection Failed!" + err.message);
    }
})();
