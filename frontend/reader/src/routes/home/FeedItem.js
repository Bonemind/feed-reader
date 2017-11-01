import { h, Component } from 'preact';
import style from './style';
import Container from 'preact-mui/lib/container';
import Panel from 'preact-mui/lib/panel';
import Col from 'preact-mui/lib/col';
import Appbar from 'preact-mui/lib/appbar';
import TimeAgo from '../../components/TimeAgo';


export default class FeedItem extends Component {
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
