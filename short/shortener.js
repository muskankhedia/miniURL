
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
	shortenURL(longURL) {
		this.x = this.removeElements(longURL)
		return this.x
	}

	/**
	 * Returns the newURL deleting the scheme
	 *
	 * @param {string} rawURL The raw input URL
	 */
    removeElements(rawURL) {

		this.longURL = rawURL;
		this.count++;

        var backupURL = this.longURL;
        var data = this.longURL.split('://');

        if (data[0] == 'http' || data[0] == 'https') {

            data.splice(0, 1)
            if (data[0].startsWith("www")) {

                data[0] = data[0].replace('www.', '');
                this.newURL = data.join('');
                this.newURL = data[0];

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

		this.datJSON = this.saveURL(this.newURL, backupURL)
        return this.datJSON
	}

	/**
	 * Returns the minified URL
	 * Saves the URL in the database with proper indexing
	 *
	 * @param {string} newsURL The refined URl
	 * @param {string} backupURL Backup of the raw URL
	 */
	saveURL(newsURL, backupURL) {

		var index1 = {}, index2 = {}, dataJSON = {};

		var char0 = newsURL.charAt(0);
		var char1 = newsURL.charAt(1);

		index2[this.count] = backupURL;
		index1[char1] = index2;
		dataJSON[char0] = index1;

		this.db.pushData('/URLs', dataJSON, false);

		// Creates the minified URL
		this.short = "https://miniurl.in/" + char0  + char1 + this.count;
		return this.short

	}

}

module.exports = { Shortener }