const { program, Option } = require("commander");
const colors = require("colors/safe");
const path = require("path");
const fs = require("fs");
const Uglify = require("uglify-js");
const ora = require("ora");

program
    .addOption(
        new Option("-w, --watch [type...]", "To watch directory")
            .preset("/")
            .default(["/"])
    )
    .addOption(
        new Option("-h, --host [type...]", "For host")
            .preset("localhost")
            .default(["localhost"])
    )
    .addOption(
        new Option("-p, --port [type]", "For port").preset("").default("")
    )
    .addOption(new Option("--client").preset(true).hideHelp(true))
    .parse();

// spinner
const spinner = ora({
    text: colors.yellow("Bundling client file..."),
    color: "yellow",
});

if (program.opts().client) {
    buildClient();
    process.exit(1);
}

const getIp = () => {
    const obj = Object.values(require("os").networkInterfaces())
        .flat()
        .find(({ family, internal }) => family === "IPv4" && !internal);

    return obj ? obj.address : "Not found";
};

let hostArr = program.opts().host;

if (hostArr.includes("ip")) {
    const index = hostArr.indexOf("ip");
    const localIp = getIp();
    if (localIp === "Not found") {
        console.log(colors.red("Local ip not found!"));
        process.exit(1);
    }
    hostArr[index] = localIp;
}

let options = program.opts();
if (isNaN(options.port)) {
    console.log(colors.red("Please input valid port to start reloader"));
    process.exit(1);
}

options.url = [];

hostArr.forEach((v) => {
    options.url.push(`${v}${options.port ? ":" + options.port : ""}`);
});

options.watch.forEach((v) => {
    const dirPath = path.join(process.cwd(), v);
    if (!fs.existsSync(dirPath)) {
        console.log(colors.red("Watch directories not exist!"));
        process.exit(1);
    }
});

function buildClient() {
    spinner.start();
    const SOCKET_FILE_PATH = path.join(__dirname, "../client/socket.io.js");
    const CLIENT_FILE_PATH = path.join(__dirname, "../client/client.js");
    const RELOADER_FILE_PATH = path.join(__dirname, "../client/reloader.js");

    const clientFiles = {
        socketFile: fs.readFileSync(SOCKET_FILE_PATH, "utf8"),
        clientFile: fs.readFileSync(CLIENT_FILE_PATH, "utf8"),
    };

    const result = Uglify.minify(clientFiles);
    try {
        fs.writeFileSync(RELOADER_FILE_PATH, result.code, "utf8");
        spinner.succeed(colors.green("Client file build successfully..."));
    } catch (err) {
        spinner.fail(colors.red("Something went wrong! = " + err.message));
    }
}

module.exports = { options, getIp };
