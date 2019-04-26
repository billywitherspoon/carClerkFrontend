import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import GarageScreen from '../screens/GarageScreen';
import VehicleScreen from '../screens/VehicleScreen';
import LogsScreen from '../screens/LogsScreen';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

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

// import TabBarIcon from '../src/components/TabBarIcon';
// import GarageScreen from '../screens/GarageScreen';
// import VehicleScreen from '../screens/VehicleScreen';
// import LogsScreen from '../screens/LogsScreen';

// const GarageStack = createStackNavigator({
// 	Garage: GarageScreen
// });

// GarageStack.navigationOptions = {
// 	tabBarLabel: 'Garage',
// 	tabBarIcon: ({ focused }) => (
// 		<TabBarIcon
// 			focused={focused}
// 			name={
// 				Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'
// 			}
// 		/>
// 	)
// };

// const VehicleStack = createStackNavigator({
// 	Vehicle: VehicleScreen
// });

// VehicleStack.navigationOptions = {
// 	tabBarLabel: 'Vehicle',
// 	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
// };

// const LogsStack = createStackNavigator({
// 	Logs: LogsScreen
// });

// LogsStack.navigationOptions = {
// 	tabBarLabel: 'Logs',
// 	tabBarIcon: ({ focused }) => (
// 		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
// 	)
// };

// export default createBottomTabNavigator({
// 	GarageStack,
// 	VehicleStack,
// 	LogsStack
// });
