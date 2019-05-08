import React from 'react';
import { Modal, View, Image, Text, StyleSheet, Button } from 'react-native';
import AddLogForm from '../components/AddLogForm';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import EditLogForm from '../components/EditLogForm';

const logModal = (props) => {
	return (
		<Modal visible={props.display} animationType="slide" onRequestClose={props.toggleLogModal}>
			<AddLogForm toggleLogModal={props.toggleLogModal} />
		</Modal>
	);
};

// const styles = StyleSheet.create({
// 	modalContainer: {
// 		flex: 1,
// 		alignSelf: 'stretch',
// 		backgroundColor: 'blue'
// 	}
// });

export default logModal;
