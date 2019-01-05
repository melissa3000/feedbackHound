import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	// depending on if user is logged in or not display different view
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return <li><a href="/auth/google">Login with Google</a></li>;
			default:
				return [
					<li key="1"><Payments /></li>,
					<li key="2"><a href="/api/logout">Logout</a></li>
				];
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link 
					to={this.props.auth ? '/surveys' : '/' } 
					className="left brand-logo"
					>
						Feedback Hound
					</Link>
					<ul className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

// gets called with entire state object out of the redux store, then return an 
// object that will be passed to the Header as props
// function mapStateToProps(state) {
// 	return { auth: state.auth };
// }
// function above refactored to:
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);