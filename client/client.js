function selfFunction() {
    // const hostUrl = getHostUrl();
    const hostUrl = "http://localhost:64356";

    function getHostUrl() {
        const scriptDocument = document.getElementsByTagName("script");
        const findScript = [...scriptDocument].find((v) =>
            v.src.includes("reloader")
        );
        if (findScript) {
            return findScript.src.slice(0, -12);
        } else {
            return false;
        }
    }

    if (!hostUrl) {
        return;
    }

    const socket = io(hostUrl);

    socket.on("connect", () => {
        socket.emit("browserConnected", {
            browser: browserText(),
            host: hostUrl.slice(7, -6),
        });
    });

    socket.on("disconnect", () => {});

    socket.on("reload", () => {
        reloadFunction();
    });
}

function reloadFunction() {
    window.location.reload();
}

function browserText() {
    const Android = /(android)/i.test(navigator.userAgent);
    return `${detectBrowser()}${Android ? " Android" : ""}`;
}

function detectBrowser() {
    if (
        (navigator.userAgent.indexOf("Opera") ||
            navigator.userAgent.indexOf("OPR")) != -1
    ) {
        return "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    } else if (
        navigator.userAgent.indexOf("MSIE") != -1 ||
        !!document.documentMode == true
    ) {
        return "IE"; //crap
    } else {
        return "Unknown";
    }
}

selfFunction();
