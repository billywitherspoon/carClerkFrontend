import {
	SET_USER_INFO,
	SET_VEHICLES,
	ADD_NEW_VEHICLE,
	SELECT_VEHICLE,
	SET_ACTIVE_LOG,
	UPDATE_ACTIVE_LOG
} from './actionTypes';

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

export const selectVehicle = (selectedVehicle) => {
	return {
		type: SELECT_VEHICLE,
		selectedVehicle: selectedVehicle
	};
};

export const setActiveLog = (activeLog) => {
	return {
		type: SET_ACTIVE_LOG,
		activeLog: activeLog
	};
};

export const updateActiveLog = (activeLogAttribute) => {
	return {
		type: UPDATE_ACTIVE_LOG,
		activeLogAttribute: activeLogAttribute
	};
};
