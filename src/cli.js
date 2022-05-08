const { program, Option } = require("commander");
const colors = require("colors/safe");
const path = require("path");
const fs = require("fs");

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
    .parse();

const getIp = () => {
    return Object.values(require("os").networkInterfaces())
        .flat()
        .find(({ family, internal }) => family === "IPv4" && !internal).address;
};

let hostArr = program.opts().host;

if (hostArr.includes("ip")) {
    const index = hostArr.indexOf("ip");
    hostArr[index] = getIp();
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

module.exports = { options, getIp };
