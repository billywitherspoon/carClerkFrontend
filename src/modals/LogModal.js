import React from 'react';
import { Modal } from 'react-native';
import AddLogForm from '../components/AddLogForm';

const logModal = (props) => {
	return (
		<Modal visible={props.display} animationType="slide" onRequestClose={props.toggleLogModal}>
			<AddLogForm toggleLogModal={props.toggleLogModal} />
		</Modal>
	);
};

export default logModal;
