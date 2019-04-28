import { SET_USER_INFO, SET_VEHICLES, ADD_NEW_VEHICLE } from './actionTypes';

export const setUserInfo = (userInfo) => {
	return {
		type: SET_USER_INFO,
		userInfo: userInfo
	};
};

export const setVehicles = (vehicles) => {
	return {
		type: SET_VEHICLES,
		vehicles: vehicles
	};
};

export const addNewVehicle = (vehicle) => {
	return {
		type: ADD_NEW_VEHICLE,
		vehicle: vehicle
	};
};

// export const SET_VEHICLES = 'SET_VEHICLES';
// export const ADD_NEW_VEHICLE = 'ADD_NEW_VEHICLE';
// export const SELECT_VEHICLE = 'SELECT_VEHICLE';
// export const SET_USER_INFO = 'SET_USER_INFO ';
