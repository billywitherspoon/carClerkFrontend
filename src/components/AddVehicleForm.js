import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addNewVehicle, selectVehicle } from '../store/actions/index.js';
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
		fetch('http://10.137.7.171:5513/api/v1/vehicles', {
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
					this.props.reduxSelectVehicle(json);
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
		fetch('http://10.137.7.171:5513/api/v1/vehicles', {
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
					this.props.reduxSelectVehicle(json);
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
				<View style={styles.formContainer}>
					<TextInput
						placeholder="Vehicle Nickname"
						onChangeText={(vehicleName) => this.setState({ vehicleName })}
						style={styles.inputBox}
					/>
					<TextInput
						placeholder="Mileage"
						onChangeText={(mileage) => this.setState({ mileage })}
						keyboardType="number-pad"
						style={styles.inputBox}
					/>
					<Text style={[ styles.body, styles.darkText ]}>Option 1: VIN (Preferred)</Text>
					<TextInput
						placeholder="VIN"
						onChangeText={(vinText) => this.setState({ vinText })}
						style={styles.inputBox}
					/>
					<Text style={[ styles.body, styles.darkText ]}>
						Option 2: License Plate and State (Alternative)
					</Text>
					<TextInput
						placeholder="License Plate"
						onChangeText={(licensePlate) => this.setState({ licensePlate })}
						style={styles.inputBox}
					/>
					<TextInput
						placeholder="State Abbreviation"
						onChangeText={(stateAbb) => this.setState({ stateAbb })}
						style={styles.inputBox}
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={this.props.toggleAddVehicleModal}
							style={[ styles.button, styles.cancelButton ]}
						>
							<Text style={[ styles.title, styles.darkText ]}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.handleVinSubmit} style={[ styles.button, styles.submitButton ]}>
							<Text style={[ styles.title, styles.lightText ]}>Submit</Text>
						</TouchableOpacity>
					</View>
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

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	inputBox: {
		borderColor: '#C9CACA',
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
		width: vw(75)
	},
	title: {
		fontSize: vh(3)
	},
	body: {
		fontSize: vh(2.25),
		fontWeight: 'bold'
	},
	lightText: {
		color: '#bdc1c5'
	},
	darkText: {
		color: '#4c5760'
	},
	button: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'transparent',
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
		marginLeft: 50,
		marginRight: 50
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'stretch'
	},
	submitButton: {
		backgroundColor: '#4c5760'
	},
	cancelButton: {
		backgroundColor: '#bdc1c5'
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		reduxAddNewVehicle: (vehicle) => dispatch(addNewVehicle(vehicle)),
		reduxSelectVehicle: (vehicle) => dispatch(selectVehicle(vehicle))
	};
};

export default connect(null, mapDispatchToProps)(AddVehicleForm);
