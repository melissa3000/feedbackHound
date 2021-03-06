import axios from 'axios';
import { FETCH_USER } from './types';

// action creator initiates change inside of the redux side of the application.
// used to modify state contained in redux store

// wire up action creator fetchUser to application
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

// action creator to post Stripe token to the backend server
export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);

	dispatch({ type: FETCH_USER, payload: res.data });
};