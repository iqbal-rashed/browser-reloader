const { program, Option } = require("commander");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const Uglify = require("uglify-js");
const ora = require("ora");

program
    .addOption(
        new Option(
            "-w, --watch [type...]",
            "To watch directory,you can watch multiple directories"
        )
            .preset("/")
            .default(["/"])
    )
    .addOption(
        new Option(
            "-h, --host [type...]",
            "For reload host,also reload multiple host"
        )
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
    text: chalk.yellow("Bundling client file..."),
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
        console.log(chalk.red("Local ip not found!"));
        process.exit(1);
    }
    hostArr[index] = localIp;
}

let options = program.opts();
if (isNaN(options.port)) {
    console.log(chalk.red("Please input valid port to start reloader"));
    process.exit(1);
}

options.url = [];

hostArr.forEach((v) => {
    options.url.push(`${v}${options.port ? ":" + options.port : ""}`);
});

options.watch.forEach((v) => {
    const dirPath = path.join(process.cwd(), v);
    if (!fs.existsSync(dirPath)) {
        console.log(chalk.red("Watch directories not exist!"));
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
        spinner.succeed(chalk.green("Client file build successfully..."));
    } catch (err) {
        spinner.fail(chalk.red("Something went wrong! = " + err.message));
    }
}

module.exports = { options, getIp };
