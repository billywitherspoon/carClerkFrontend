import { ADD_NEW_VEHICLE, SET_USER_INFO, SET_VEHICLES, SELECT_VEHICLE } from '../actions/actionTypes';

const initialState = {
	userInfo: { id: 1 },
	vehicles: [],
	selectedVehicle: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_INFO:
			return {
				...state,
				userInfo: action.userInfo
			};
		case SET_VEHICLES:
			return {
				...state,
				vehicles: action.vehicles
			};
		case ADD_NEW_VEHICLE:
			return {
				...state,
				vehicles: [ ...state.vehicles, action.vehicle ]
			};
		case SELECT_VEHICLE:
			return {
				...state,
				selectedVehicle: action.selectedVehicle
			};
		default:
			return state;
	}
};

export default reducer;
