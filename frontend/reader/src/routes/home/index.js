import { h, Component } from 'preact';
import style from './style';
import Container from 'preact-mui/lib/container';
import Panel from 'preact-mui/lib/panel';
import Col from 'preact-mui/lib/col';
import TimeAgo from '../../components/TimeAgo';

const FEEDS_URL = 'http://localhost:4000/feeds';


class FeedContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feeds: []
		}
		this.loadFeeds = this.loadFeeds.bind(this);
		this.getEntries = this.getEntries.bind(this);
		this.getEntriesDateSorted = this.getEntriesDateSorted.bind(this);
		this.getForCols = this.getForCols.bind(this);
		this.loadFeeds();
	}

	loadFeeds() {
		fetch(FEEDS_URL).then((response) => {
			return response.json()
		}).then((data) => {
			this.setState({feeds: data});
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

	getEntriesDateSorted() {
		return this.getEntries().sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());
	}

	getForCols(cols) {
		const split = [];
		const entries = this.getEntriesDateSorted();
		for (let i = 0; i < entries.length; i++) {
			const col = i % cols;
			if (!split[col]) {
				split[col] = []
			}
			split[col].push(entries[i]);
		}
		console.log(split);
		return split.map((col) => {
			const items = col.map(f => <FeedItem item={f} />);
			return <Col md={12/cols}>{items}</Col>
		});
	}

	render() {
		const cols = 3;
		this.getForCols(cols);
		return (
			<div>
				{ this.getForCols(cols) }
			</div>
		)
	}
}

class FeedItem extends Component {
	render() {
		return (
			<Panel>
				<span>
					<h3><a target="_blank" href={this.props.item.link}>{this.props.item.title}</a></h3>
					Posted on: <TimeAgo datetime={this.props.item.date} live={true} /> via&nbsp;
					<a href={this.props.item.feedLink}>{this.props.item.feedTitle}</a>
				</span>
			</Panel>
		)
	}
}

export default class Home extends Component {
	render() {
		return (
			<Container fluid={true}>
				<FeedContainer />
			</Container>
		);
	}
}
