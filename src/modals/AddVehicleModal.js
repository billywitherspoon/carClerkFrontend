import React from 'react';
import { Modal, View, Image, Text, StyleSheet, Button } from 'react-native';
import AddVehicleForm from '../components/AddVehicleForm';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const addVehicleModal = (props) => (
	<Modal
		visible={props.display}
		animationType="slide"
		onRequestClose={props.toggleAddVehicleModal}
		style={styles.modalContainer}
	>
		<AddVehicleForm toggleAddVehicleModal={props.toggleAddVehicleModal} />
	</Modal>
);

const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: '#e5e8ec'
	}
});

export default addVehicleModal;
