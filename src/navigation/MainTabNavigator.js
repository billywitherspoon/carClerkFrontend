import React from 'react';
// import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import GarageScreen from '../screens/GarageScreen';
import VehicleScreen from '../screens/VehicleScreen';
import LogsScreen from '../screens/LogsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GarageStack = createStackNavigator({
	Garage: GarageScreen
});

GarageStack.navigationOptions = {
	tabBarLabel: 'Garage',
	tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="garage" size={32} color="grey" />
};

const LogsStack = createStackNavigator({
	Logs: LogsScreen
});

LogsStack.navigationOptions = {
	tabBarLabel: 'Logs',
	tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="notebook" size={28} color="grey" />
};

const VehicleStack = createStackNavigator({
	Vehicle: VehicleScreen
});

VehicleStack.navigationOptions = {
	tabBarLabel: 'Vehicle',
	tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="car-sports" size={34} color="grey" />
};

export default createBottomTabNavigator({
	GarageStack,
	LogsStack,
	VehicleStack
});
