const dbManager = require('../utils/db-manager').DBManager;

class Shortener {

    constructor() {
		// Global count variable to maintain the URL count
		this.count = 0

		// Creating a dbManager object
		this.db = new dbManager();

		// Creating a database to store all the URLs
		this.db.createDB('./dbs/URLData')
	}

	/**
	 * Returns the shortened URL
	 *
	 * @param {string} longURL The input URL
	 */
	shortenURL(req, longURL) {
		return this.removeElements(req, longURL);
	}

	/**
	 * Returns the newURL deleting the scheme
	 * @param {string} rawURL The raw input URL
	 */
    removeElements(req, rawURL) {
		this.longURL = rawURL;
		this.count++;
        const backupURL = this.longURL;
        const data = this.longURL.split('://');

        if (data[0] == 'http' || data[0] == 'https') {
			data.splice(0, 1)

            if (data[0].startsWith("www")) {
                data[0] = data[0].replace('www.', '');
                this.newURL = data.join('');
                this.newURL = data[0]; // do we require this?
            } else {
				this.newURL = data.join('');
			}
        } else {
			data = this.longURL.split('.');

            if (data[0] == 'wwww') {
                data[0] = data[0].replace('www.', '');
				this.newURL = data.join('');
            } else {
				this.newURL = this.longURL;
			}
		}

		this.datJSON = this.saveURL(req, this.newURL, backupURL);
        return this.datJSON;
	}

	/**
	 * Returns the minified URL
	 * Saves the URL in the database with proper indexing
	 *
	 * @param {string} newsURL The refined URl
	 * @param {string} backupURL Backup of the raw URL
	 */
	saveURL(request, newsURL, backupURL) {
		console.log(newsURL, ' and backup ', backupURL)

		const index1 = {};
		const index2 = {};
		const dataJSON = {};

		const char0 = newsURL.charAt(0);
		const char1 = newsURL.charAt(1);

		index2[this.count] = backupURL;
		index1[char1] = index2;
		dataJSON[char0] = index1;

		this.db.pushData('/URLs', dataJSON, false);

		// Creates the minified URL
		console.warn(request.headers.host)
		this.short = request.headers.host + char0  + char1 + this.count;
		this.short = `<a href="http://${request.headers.host}/url?query=${char0 + char1 + this.count}">
			http://${request.headers.host}/url?query=${char0 + char1 + this.count}</a>`;
		return this.short
	}

	getUrl(code) {
		const indexLevel1 = code.charAt(0);
		const indexLevel2 = code.charAt(1);
		const hexCode = code.substring(2);

		const path = `/URLs/${indexLevel1}/${indexLevel2}/${hexCode}`;
		return this.db.getData(path);
	}
}

module.exports = { Shortener }
