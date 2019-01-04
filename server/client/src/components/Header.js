import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
	// depending on if user is logged in or not display different view
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return <li><a href="/auth/google">Login with Google</a></li>;
			default:
				return <li><a>Logout</a></li>;
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<a className="left brand-logo">
						Feedback Hound
					</a>
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