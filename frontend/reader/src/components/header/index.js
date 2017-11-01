import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import Appbar from 'preact-mui/lib/appbar';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			<Appbar>
				<h1>Reader</h1>
			</Appbar>
		);
	}
}
