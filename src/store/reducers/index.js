import {
	ADD_NEW_VEHICLE,
	SET_USER_INFO,
	SET_VEHICLES,
	SELECT_VEHICLE,
	SET_ACTIVE_LOG,
	UPDATE_ACTIVE_LOG
} from '../actions/actionTypes';

const initialState = {
	userInfo: { id: 1 },
	vehicles: [],
	selectedVehicle: null,
	activeLog: { title: null, description: null, mileage: null }
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
		case SET_ACTIVE_LOG:
			return {
				...state,
				activeLog: action.activeLog
			};
		case UPDATE_ACTIVE_LOG:
			return {
				...state,
				activeLog: {
					...state.activeLog,
					...action.activeLogAttribute
				}
			};

		default:
			return state;
	}
};

export default reducer;
