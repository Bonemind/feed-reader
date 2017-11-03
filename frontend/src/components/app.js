import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { CubeGrid } from 'styled-loaders';

import Header from './header';
import DateSortedEntryView from '../routes/home/DateSortedEntryView';
import FeedSortedView from '../routes/home/FeedSortedView';
import Profile from '../routes/profile';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
const FEEDS_URL = '/api/feeds.json';
const REFRESH_TIME = 30 * 1000;
const COLS = 3;

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feeds: [],
			lastRefresh: null
		};

		this.loadFeeds = this.loadFeeds.bind(this);
		this.getEntries = this.getEntries.bind(this);
		this.scheduleRefresh = this.scheduleRefresh.bind(this);
		this.scheduleRefresh();
	}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	scheduleRefresh() {
		return this.loadFeeds()
			.then(() => setTimeout(this.scheduleRefresh, REFRESH_TIME));
	}

	loadFeeds() {
		return fetch(FEEDS_URL).then((response) => {
			return response.json()
		}).then((data) => {
			this.setState({feeds: data, lastRefresh: new Date()});
		});
	}

	getEntries() {
		let entries = [];
		this.state.feeds.forEach(f => {
			entries = entries.concat(f.entries);
		});
		entries.forEach(e => {
			e.parsedDate = new Date(e.date);
		});
		return entries;
	}

	render() {
		return (
			<div id="app">
				<Header lastrefresh={this.state.lastRefresh} />
				<Router onChange={this.handleRoute}>
					<DateSortedEntryView cols={COLS} feedEntries={this.getEntries()} path="/" />
					<DateSortedEntryView cols={COLS} feedEntries={this.getEntries()} path="/date" />
					<FeedSortedView cols={COLS} feedEntries={this.getEntries()} path="/feed" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
				{ this.state.lastRefresh === null && <CubeGrid color={'#2196F3'} /> }
				<script src="//cdn.muicss.com/mui-0.9.6/js/mui.min.js"></script>
			</div>
		);
	}
}
