import React from 'react';
import { Modal, View, Image, Text, StyleSheet, Button } from 'react-native';
import AddVehicleForm from '../components/AddVehicleForm';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const addVehicleModal = (props) => (
	<Modal visible={props.display} animationType="slide" onRequestClose={() => console.log('closed')}>
		<AddVehicleForm toggleAddVehicleModal={props.toggleAddVehicleModal} />
	</Modal>
);

const styles = StyleSheet.create({
	image: {
		marginTop: 20,
		marginLeft: 90,
		height: 200,
		width: 200
	},
	text: {
		fontSize: 20,
		marginLeft: 150
	},
	flexCenter: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	}
});

export default addVehicleModal;
