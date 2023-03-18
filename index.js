const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { spawn } = require("child_process");

// Set up middleware to parse JSON request body
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define endpoint to check if a URL is malicious
app.post("/check-url", (req, res) => {
    const site = req.body.url || null;
    console.log("Received URL: " + site);
    if (site) {
        var dataToSend;
        const python = spawn("python", ["./test.py", site]);

        // collect data from script
        python.stdout.on("data", function (data) {
            dataToSend = data.toString();
        });

        python.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });

        // in close event we are sure that stream from child process is closed
        python.on("exit", (code) => {
            // Send response to the client with the result of the check
            res.status(200).send(dataToSend);
            console.log(`child process exited with code ${code} ` + dataToSend);
        });
    } else {
        res.status(400).send("Error: URL is null or empty.");
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
