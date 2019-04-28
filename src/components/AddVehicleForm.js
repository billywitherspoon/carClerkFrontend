import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native';

export default class AddVehicleForm extends Component {
	constructor(props) {
		super(props);
		this.state = { vinText: '', showContent: true };
	}

	toggleContent = () => {
		this.setState((prevState) => {
			return {
				showContent: !prevState.showContent
			};
		});
	};

	handleVinSubmit = () => {
		let vin = this.state.vinText.toLowerCase();
		if (vin.length > 9 && vin.length < 18) {
			console.log('valid vin');
			this.toggleContent();
			this.fetchVin(vin);
		} else {
			alert('invalid vin');
		}
	};

	fetchVin = (vin) => {
		fetch('http://192.168.1.14:5555/api/v1/vehicles', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				vin: `${vin}`,
				user_id: 1
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log('initial respons to new vin post:', json);
				if (json.errors === 'NO MATCH') {
					console.log('return no match');
					alert('Matching Vin Not Found');
					this.toggleContent();
				} else {
					console.log('returned good json');
					this.props.toggleFormModal();
					let vehicle = this.removeUserFromVehicleJson(json);
					// call redux to append this vehicle to vehicles state (pass through vehicle)
					// this.props.updateVehiclesState(json);
				}
			});
	};

	removeUserFromVehicleJson = (json) => {
		return json.map((v) => {
			delete v.user;
			return v;
		});
	};

	renderContent = () => {
		if (this.state.showContent) {
			return (
				<View>
					<Button onPress={() => this.handleVinSubmit(this.state)} title="Submit" color="blue" />
					<TextInput placeholder="Enter VIN" onChangeText={(vinText) => this.setState({ vinText })} />
					<Button onPress={() => this.props.toggleFormModal()} title="Cancel" color="red" />
				</View>
			);
		} else {
			return (
				<View>
					<Text>Looking for submitted Vin...</Text>
				</View>
			);
		}
	};

	render() {
		return <View>{this.renderContent()}</View>;
	}
}

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
