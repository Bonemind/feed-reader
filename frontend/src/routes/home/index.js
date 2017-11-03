import { h, Component } from 'preact';
import style from './style';
import Container from 'preact-mui/lib/container';
import Panel from 'preact-mui/lib/panel';
import Col from 'preact-mui/lib/col';
import Appbar from 'preact-mui/lib/appbar';
import TimeAgo from '../../components/TimeAgo';


class FeedEntryColumnDisplay extends Component {
	getForCols(cols, entries) {
		const split = [];
		for (let i = 0; i < entries.length; i++) {
			const col = i % cols;
			if (!split[col]) {
				split[col] = []
			}
			split[col].push(entries[i]);
		}
		return split.map((col) => {
			const items = col.map(f => <FeedItem item={f} />);
			return <Col md={12/cols}>{items}</Col>
		});
	}

	render() {
		return (
			<Container fluid={true}>
				{ this.props.feedEntries && this.getForCols(this.props.cols, this.props.feedEntries) }
			</Container>
		)
	}
}

class FeedItem extends Component {
	render() {
		return (
			<Panel>
				<span>
					<h3><a target="_blank" href={this.props.item.link}>{this.props.item.title}</a></h3>
					Posted on: {this.props.item.date ? <TimeAgo datetime={this.props.item.date} live={true} /> : 'Unknown' } via&nbsp;
					<a href={this.props.item.feedLink}>{this.props.item.feedTitle}</a>
				</span>
			</Panel>
		)
	}
}

export {DateSortedEntryView, FeedSortedView};
