import axios from 'axios';
import { FETCH_USER } from './types';

// action creator initiates change inside of the redux side of the application.
// used to modify state contained in redux store

const fetchUser = () => {
	axios.get('/api/current_user');
};