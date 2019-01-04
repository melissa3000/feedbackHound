import { FETCH_USER } from '../actions/types';

// import fetchUser action type and set up a case on the switch statement to watch 
// for that action to come in to this reducer

// make sure the user doesn't see automatically the logged in or not logged in view
// while the app is verifying if they're logged in or not. This prevents the ui from 
// changing abruptly if the user is on a slower connection and the verification takes
// a vew seconds. While waiting for request to determine if user is logged in, reducer 
// should return null (indicates currently unknown if user is logged in or not yet). 
// If the user is logged in, Auth Reducer will return user model (object containing user id).
// If user not logged in, Auth Reducer will return false. 
export default function(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			// this is the user object or if it's an empty string and user is logged out it is false
			return action.payload || false;
		default:
			return state;
	}
}