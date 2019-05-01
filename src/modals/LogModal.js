import React from 'react';
import { Modal, View, Image, Text, StyleSheet, Button } from 'react-native';
import AddLogForm from '../components/AddLogForm';

const logModal = (props) => (
	<Modal visible={props.display} animationType="slide" onRequestClose={() => console.log('closed')}>
		<AddLogForm toggleLogModal={props.toggleLogModal} />
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
	}
});

export default logModal;
