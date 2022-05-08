#! /usr/bin/env node

const { options, getIp } = require("./cli");
const colors = require("colors/safe");
const boxen = require("boxen");
const ora = require("ora");

// for server
const express = require("express");
const { createServer } = require("http");
const app = express();
const httpServer = createServer(app);
const io = require("socket.io")(httpServer, { cors: "*" });
const cors = require("cors");

// for reload
const path = require("path");
const chokidar = require("chokidar");

// middleware
app.use(cors);

// spinner
const spinner = ora({
    text: colors.yellow("Connecting with extension..."),
    color: "yellow",
});

// listen server
httpServer.listen(64356, () => {
    console.log(
        boxen(
            colors.blue(
                "Reloader is running...\n" +
                    "Watch Dir: " +
                    options.watch.join(", ") +
                    "\n" +
                    "Reload Url: " +
                    options.url.join(", ") +
                    "\n" +
                    "IPv4 Address: " +
                    getIp()
            ),
            {
                padding: 1,
                borderColor: "blue",
                dimBorder: true,
                margin: 1,
            }
        )
    );
    spinner.start();
});

// socket io
io.on("connection", (socket) => {
    socket.on("browserConnected", function (browserObj) {
        socket.browserObj = browserObj;

        spinner.succeed(
            colors.green(
                `Reloader connected with ${colors.bgGreen(
                    " " + colors.white(browserObj.browser) + " "
                )} ${browserObj.host}`
            )
        );
    });

    // watch directory
    options.watch.forEach((value) => {
        chokidar
            .watch(path.join(process.cwd(), value))
            .on("change", (event, path) => {
                socket.emit("reload", { url: options.url });
            })
            .on("error", (error) => {
                console.log(error);
                process.exit(1);
            });
    });

    socket.on("disconnect", (reason) => {
        spinner.fail(
            colors.red(
                `Reloader lost connection with ${socket.browserObj.browser} ${socket.browserObj.host}`
            )
        );
    });
});
