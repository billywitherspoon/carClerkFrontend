import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

const VehicleCard = (props) => {
	return (
		<View style={styles.vehicleCard}>
			<Text>{props.vehicle.year}</Text>
			<Text>{props.vehicle.make}</Text>
			<Text>{props.vehicle.model}</Text>
			<Text>{props.vehicle.trim}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	vehicleCard: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#D3D3D3',
		borderWidth: 1
	}
});

export default VehicleCard;
