import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import Appbar from 'preact-mui/lib/appbar';
import style from './style';
import TimeAgo from '../TimeAgo';

let s1 = {verticalAlign: 'middle'};
let s2 = {textAlign: 'right'};
let title = {fontSize: '20px'};

export default class Header extends Component {
	render() {
		console.log('render');
		const lastrefresh = this.props.lastrefresh ? this.props.lastrefresh.toTimeString().split(' ')[0] : 'Never';
		return (
			<Appbar>
				<table width="100%">
					<tbody>
						<tr style={s1}>
							<td className="mui--appbar-height" style={title}>Reader</td>
							<td className="mui--appbar-height" style={s2}>
								Refreshed: {lastrefresh}
							</td>
						</tr>
					</tbody>
				</table>
			</Appbar>
		);
	}
}
