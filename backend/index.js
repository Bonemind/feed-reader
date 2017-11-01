var express = require('express');
var rssParser = require('rss-parser');
var cors = require('cors');
var app = express();
app.use(cors());

//const REFRESH_INTERVAL = 5 * 60 * 1000;
const REFRESH_INTERVAL = 5 * 60 * 1000

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

feeds = ['http://feeds.feedburner.com/RockPaperShotgun', 'https://news.ycombinator.com/rss'];
let lastRefresh = new Date('1970-01-01');
let cachedFeeds = []

app.get('/feeds', (req, res) => {
	if (new Date() - lastRefresh < REFRESH_INTERVAL) {
		console.log('Within refresh interval, using cache');
		res.send(cachedFeeds);
	} else {
		loadFeeds(feeds).then((resp) => {
			cachedFeeds = resp;
			res.send(resp);
			lastRefresh = new Date();
			console.log('refreshed feeds');
		});
	}
});

app.listen(4000, () => {
  console.log('Example app listening on port 4000!')
});
