import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Stripe defaults to USD currency in cents so $5 is 500.
// Token expects a callback function that will be provided when Stripe returns a token
// authorizing the charge
class Payments extends Component {
	render() {
		console.log('PAYMENTS KEY: ', process.env.REACT_APP_STRIPE_KEY);
		return (
			<StripeCheckout 
				name="Feedback Hound"
				description="Purchase 5 survey credits for $5"
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">
					Add Survey Credits
				</button>
			</StripeCheckout>
		);
	}
}

//no mapStateToProps needed here so just pass in action creators
export default connect(null, actions)(Payments);

