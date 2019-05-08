import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { addNewVehicle } from '../store/actions/index.js';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class AddVehicleForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vinText: '',
			vehicleName: '',
			licensePlate: '',
			stateAbb: '',
			mileage: '',
			showContent: true
		};
	}

	toggleContent = () => {
		this.setState((prevState) => {
			return {
				showContent: !prevState.showContent
			};
		});
	};

	handleVinSubmit = () => {
		if (this.state.vehicleName) {
			if (this.state.vinText) {
				let vin = this.state.vinText.toLowerCase();
				if (vin.length > 9 && vin.length < 18) {
					console.log('valid vin');
					if (parseInt(this.state.mileage) > 0) {
						this.toggleContent();
						this.fetchVin(vin);
					} else {
						alert('Please Enter A Valid Mileage');
					}
				} else {
					alert('invalid vin');
				}
			} else if (this.state.licensePlate && this.state.stateAbb) {
				let plate = this.state.licensePlate.toLowerCase();
				let stateAbb = this.state.stateAbb.toLowerCase();
				if (stateAbb.length > 1 && stateAbb.length < 3) {
					this.toggleContent();
					this.fetchPlateState(plate, stateAbb);
				} else {
					alert('Please Enter A Valid State');
				}
			}
		} else {
			alert('Please enter a nickname for this vehicle');
		}
	};

	fetchPlateState(plate, stateAbb) {
		fetch('http://10.137.1.80:5513/api/v1/vehicles', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				plate: `${plate}`,
				plate_state: `${stateAbb}`,
				user_id: 1,
				name: `${this.state.vehicleName}`,
				mileage: `${this.state.mileage}`
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log('received response to new vin post');
				if (json.errors === 'NO MATCH') {
					console.log('return no match');
					alert('Matching plate information not found, try submitting by VIN');
					this.toggleContent();
				} else {
					console.log('returned good json');
					// delete json.user;
					this.props.reduxAddNewVehicle(json);
					this.props.toggleAddVehicleModal();
					// call redux to append this vehicle to vehicles state (pass through vehicle)
					// this.props.updateVehiclesState(json);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	fetchVin = (vin) => {
		fetch('http://10.137.1.80:5513/api/v1/vehicles', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				vin: `${vin}`,
				user_id: 1,
				name: `${this.state.vehicleName}`,
				mileage: `${this.state.mileage}`
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log('received response to new vin post');
				if (json.errors === 'NO MATCH') {
					console.log('return no match');
					alert('Matching VIN Not Found');
					this.toggleContent();
				} else {
					console.log('returned good json');
					// delete json.user;
					this.props.reduxAddNewVehicle(json);
					this.props.toggleAddVehicleModal();
					// call redux to append this vehicle to vehicles state (pass through vehicle)
					// this.props.updateVehiclesState(json);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		if (this.state.showContent) {
			return (
				<View>
					<Button onPress={this.handleVinSubmit} title="Submit" color="#3f7cac" />
					<TextInput
						placeholder="Enter a nickname for this vehicle"
						onChangeText={(vehicleName) => this.setState({ vehicleName })}
					/>
					<TextInput placeholder="Enter VIN" onChangeText={(vinText) => this.setState({ vinText })} />
					<Text>OR ENTER LICENSE PLATE AND STATE </Text>
					<TextInput
						placeholder="Enter License Plate"
						onChangeText={(licensePlate) => this.setState({ licensePlate })}
					/>
					<TextInput
						placeholder="Enter State Abbreviation"
						onChangeText={(stateAbb) => this.setState({ stateAbb })}
					/>
					<TextInput
						placeholder="Enter Vehicle Mileage"
						onChangeText={(mileage) => this.setState({ mileage })}
						keyboardType="number-pad"
					/>
					<Button onPress={this.props.toggleAddVehicleModal} title="Cancel" color="#c33149" />
				</View>
			);
		} else {
			return (
				<View>
					<Text>Searching for vehicle info...</Text>
				</View>
			);
		}
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		reduxAddNewVehicle: (vehicle) => dispatch(addNewVehicle(vehicle))
	};
};

export default connect(null, mapDispatchToProps)(AddVehicleForm);
