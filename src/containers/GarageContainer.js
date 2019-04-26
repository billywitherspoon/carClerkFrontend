import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import FormModal from '../modals/FormModal';

class GarageContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { displayModalForm: false };
	}

	toggleFormModal = () => {
		this.setState((prevState) => {
			return {
				displayModalForm: !prevState.displayModalForm
			};
		});
		console.log('Form Modal Toggled');
	};

	render() {
		return (
			<View>
				<Text>GarageContainer</Text>
				<Button onPress={() => this.toggleFormModal()} title="Add a New Vehicle" color="green" />
				<FormModal
					display={this.state.displayModalForm}
					toggleFormModal={this.toggleFormModal}
					{...this.props}
				/>
			</View>
		);
	}
}

export default GarageContainer;
