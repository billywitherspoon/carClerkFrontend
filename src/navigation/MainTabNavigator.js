import React from 'react';
// import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import GarageScreen from '../screens/GarageScreen';
import VehicleScreen from '../screens/VehicleScreen';
import LogsScreen from '../screens/LogsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const GarageStack = createStackNavigator({
	Garage: GarageScreen
});

GarageStack.navigationOptions = {
	tabBarOptions: {
		activeTintColor: '#e5e8ec',
		inactiveTintColor: '#e5e8ec',
		style: {
			backgroundColor: '#1c3144'
		}
	},
	tabBarLabel: 'Garage',
	tabBarIcon: <MaterialCommunityIcons name="garage" size={32} color="#e5e8ec" />
};

const LogsStack = createStackNavigator({
	Logs: LogsScreen
});

LogsStack.navigationOptions = {
	tabBarOptions: {
		activeTintColor: '#e5e8ec',
		inactiveTintColor: '#e5e8ec',
		style: {
			backgroundColor: '#1c3144'
		}
	},
	tabBarLabel: 'Logs',
	tabBarIcon: <MaterialCommunityIcons name="notebook" size={28} color="#e5e8ec" />
};

//{ focused }

const VehicleStack = createStackNavigator({
	Vehicle: VehicleScreen
});

VehicleStack.navigationOptions = {
	tabBarOptions: {
		activeTintColor: '#e5e8ec',
		inactiveTintColor: '#e5e8ec',
		style: {
			backgroundColor: '#1c3144'
		}
	},
	tabBarLabel: 'Vehicle',
	tabBarIcon: <MaterialCommunityIcons name="car-sports" size={34} color="#e5e8ec" />
};

export default createBottomTabNavigator({
	GarageStack,
	LogsStack,
	VehicleStack
});

// const TabNavigator = createBottomTabNavigator({
// 	Home: HomeScreen,
// 	Settings: SettingsScreen,
//  });

//  export default createAppContainer(TabNavigator);
