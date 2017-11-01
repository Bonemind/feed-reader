import { h, Component } from 'preact';
import style from './style';
import Container from 'preact-mui/lib/container';
import Panel from 'preact-mui/lib/panel';
import Col from 'preact-mui/lib/col';
import Appbar from 'preact-mui/lib/appbar';
import TimeAgo from '../../components/TimeAgo';
import FeedEntryColumnDisplay from './FeedEntryColumnDisplay';


export default class DateSortedEntryView extends Component {
	constructor(props) {
		super(props);
		this.getEntriesDateSorted = this.getEntriesDateSorted.bind(this);
	}

	getEntriesDateSorted(entries) {
		return entries.sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime());
	}

	render() {
		return (
			<Container fuid={true}>
				<FeedEntryColumnDisplay
					cols={this.props.cols}
					feedEntries={this.getEntriesDateSorted(this.props.feedEntries)}
				/>
			</Container>
		)
	}
}
