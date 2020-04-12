class Shortener {

    constructor(inputURL) {
        this.longURL = inputURL;
    }

    shortenURL() {
        console.log("longURL:: ", this.longURL);
        return this.longURL
    }
}

module.exports = { Shortener }