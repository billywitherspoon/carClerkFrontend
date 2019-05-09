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
		let mileageInput = this.state.mileage.replace(/\D/g, '');
		if (this.state.vehicleName) {
			if (parseInt(mileageInput) > 0 && parseInt(mileageInput) < 1000000) {
				if (this.state.vinText) {
					let vin = this.state.vinText.toLowerCase().replace(/\W/g, '');
					if (vin.length > 9 && vin.length < 18) {
						console.log('valid vin');
						this.toggleContent();
						this.fetchVin(vin, mileageInput);
					} else {
						alert('Please enter a valid VIN');
					}
				} else if (this.state.licensePlate && this.state.stateAbb) {
					let plate = this.state.licensePlate.toLowerCase().replace(/\W/g, '');
					let stateAbb = this.state.stateAbb.toLowerCase().replace(/\W/g, '');
					if (stateAbb.length > 1 && stateAbb.length < 3) {
						this.toggleContent();
						this.fetchPlateState(plate, stateAbb, mileageInput);
					} else {
						alert('Please enter a valid State');
					}
				} else {
					alert('Please enter a VIN or License Plate and State');
				}
			} else {
				alert('Please enter a Mileage between 1 and 999,999');
			}
		} else {
			alert('Please enter a Nickname for this vehicle');
		}
	};

	fetchPlateState(plate, stateAbb, mileageInput) {
		fetch('http://10.137.7.125:5513/api/v1/vehicles', {
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
				mileage: `${mileageInput}`
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

	fetchVin = (vin, mileageInput) => {
		fetch('http://10.137.7.125:5513/api/v1/vehicles', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				vin: `${vin}`,
				user_id: 1,
				name: `${this.state.vehicleName}`,
				mileage: `${mileageInput}`
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
					<Text style={[ styles.body, styles.darkText ]}>Required</Text>
					<TextInput
						placeholderTextColor="#929496"
						placeholder="Nickname"
						onChangeText={(vehicleName) => this.setState({ vehicleName })}
						style={styles.inputBox}
					/>
					<TextInput
						placeholderTextColor="#929496"
						placeholder="Mileage"
						onChangeText={(mileage) => this.setState({ mileage })}
						keyboardType="number-pad"
						style={styles.inputBox}
					/>
					<Text style={[ styles.body, styles.darkText ]}>Option 1: VIN (Preferred)</Text>
					<TextInput
						placeholderTextColor="#929496"
						placeholder="VIN"
						onChangeText={(vinText) => this.setState({ vinText })}
						style={styles.inputBox}
					/>
					<Text style={[ styles.body, styles.darkText ]}>
						Option 2: License Plate and State (Alternative)
					</Text>
					<TextInput
						placeholderTextColor="#929496"
						placeholder="License Plate"
						onChangeText={(licensePlate) => this.setState({ licensePlate })}
						style={styles.inputBox}
					/>
					<TextInput
						placeholderTextColor="#929496"
						placeholder="State Abbreviation"
						onChangeText={(stateAbb) => this.setState({ stateAbb })}
						style={styles.inputBox}
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={this.props.toggleAddVehicleModal}
							style={[ styles.button, styles.cancelButton ]}
						>
							<Text style={[ styles.title, styles.redText ]}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.handleVinSubmit} style={[ styles.button, styles.submitButton ]}>
							<Text style={[ styles.title, styles.darkText ]}>Submit</Text>
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
		justifyContent: 'space-around',
		backgroundColor: '#e5e8ec'
	},
	inputBox: {
		borderColor: '#929497',
		borderWidth: 1,
		borderRadius: 10,
		width: vw(75),
		color: '#1c3144',
		fontSize: 15,
		height: 35,
		paddingLeft: 15
	},
	title: {
		fontSize: vh(2.5)
	},
	body: {
		fontSize: vh(2.25),
		fontWeight: 'bold'
	},
	lightText: {
		color: '#e5e8ec'
	},
	darkText: {
		color: '#1c3144'
	},
	redText: {
		color: '#d00000'
	},
	button: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
		backgroundColor: '#e5e8ec',
		borderColor: '#1c3144'
	},
	cancelButton: {
		backgroundColor: '#e5e8ec',
		borderColor: '#d00000'
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		reduxAddNewVehicle: (vehicle) => dispatch(addNewVehicle(vehicle)),
		reduxSelectVehicle: (vehicle) => dispatch(selectVehicle(vehicle))
	};
};

export default connect(null, mapDispatchToProps)(AddVehicleForm);
