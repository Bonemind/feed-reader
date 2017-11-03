"use strict";
const express = require('express');
const rssParser = require('rss-parser');
const cors = require('cors');
const app = express();
const config = require('./config');
const serveStatic = require('serve-static');
var path = require('path');

const REFRESH_INTERVAL = config.refreshInterval * 60 * 1000
const FEEDS_URL = '/feeds.json';
app.use(cors());

const loadUrl = (url) => {
	return new Promise((resolve, reject) => {
		rssParser.parseURL(url, (err, parsed) => {
			if (err) {
				reject(err);
			} else {
				resolve(parsed);
			}
		});
	});
}

const loadFeeds = (feeds) => {
	let promises = feeds.map(f => {
		return loadUrl(f).then(data => {
			const title = data.feed.title;
			const link = data.feed.link;
			const entries = data.feed.entries.map(e => ({
				feedTitle: title,
				feedLink: link,
				title: e.title,
				link: e.link,
				date: e.isoDate
			}));
			return {
				title,
				link,
				entries
			};
		});
	});
	return Promise.all(promises);
}

let lastRefresh = new Date('1970-01-01');
let cachedFeeds = []

app.get(FEEDS_URL, (req, res) => {
	if (new Date() - lastRefresh < REFRESH_INTERVAL) {
		console.info("Responding with cached feeds");
		res.send(cachedFeeds);
	} else {
		loadFeeds(config.feeds).then((resp) => {
			console.info("Feed refresh interval passed, refreshing");
			cachedFeeds = resp;
			res.send(resp);
			lastRefresh = new Date();
		});
	}
});

// Allow process to exit when running in docker and receiving ctrl-c
process.on('SIGINT', function() {
    process.exit();
});

app.listen(4000, () => {
  console.log('Feedparser running on port 4000')
});
