import { ADD_NEW_VEHICLE, SET_USER_INFO, SET_VEHICLES } from '../actions/actionTypes';

const initialState = {
	userInfo: { id: 1 },
	vehicles: [],
	selectedVehicle: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_INFO:
			return {
				userInfo: action.userInfo
			};
		case SET_VEHICLES:
			return {
				vehicles: action.vehicles
			};
		case ADD_NEW_VEHICLE:
			return {
				...state,
				vehicles: [ ...state.vehicles, action.vehicle ]
			};
		default:
			return state;
	}
};

export default reducer;
