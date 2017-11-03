import { h, Component } from 'preact';
import style from './style';
import Container from 'preact-mui/lib/container';
import Panel from 'preact-mui/lib/panel';
import Col from 'preact-mui/lib/col';
import Appbar from 'preact-mui/lib/appbar';
import TimeAgo from '../../components/TimeAgo';
import FeedEntryColumnDisplay from './FeedEntryColumnDisplay';


export default class FeedSortedView extends Component {
	render() {
		console.log(this.props.feedEntries);
		return (
			<FeedEntryColumnDisplay
				cols={this.props.cols}
				feedEntries={this.props.feedEntries}
			/>
		)
	}
}
