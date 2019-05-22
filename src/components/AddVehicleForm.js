import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Picker } from 'react-native';
import { connect } from 'react-redux';
import { addNewVehicle, selectVehicle } from '../store/actions/index.js';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { DotIndicator } from 'react-native-indicators';

const stateArray = [
	'AL',
	'AK',
	'AS',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DE',
	'DC',
	'FM',
	'FL',
	'GA',
	'GU',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MH',
	'MD',
	'MA',
	'MI',
	'MN',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'ND',
	'MP',
	'OH',
	'OK',
	'OR',
	'PW',
	'PA',
	'PR',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VI',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY'
];

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
					let stateAbb = this.state.stateAbb.toUpperCase().replace(/\W/g, '');

					if (stateArray.includes(stateAbb)) {
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
		fetch('http://192.168.1.92:5513/api/v1/vehicles', {
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
		fetch('http://192.168.1.92:5513/api/v1/vehicles', {
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

	renderStatePickerItems = () => {
		return stateArray.map((state) => {
			return <Picker.Item label={state} value={state} key={Math.random()} />;
		});
	};

	render() {
		if (this.state.showContent) {
			return (
				<View style={styles.formContainer}>
					<Text style={[ styles.bodyText, styles.darkText ]}>Required</Text>
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
					<Text style={[ styles.bodyText, styles.darkText ]}>Option 1: VIN</Text>
					<TextInput
						placeholderTextColor="#929496"
						placeholder="VIN"
						onChangeText={(vinText) => this.setState({ vinText })}
						style={styles.inputBox}
					/>
					<Text style={[ styles.bodyText, styles.darkText ]}>Option 2: License Plate and State</Text>
					<TextInput
						placeholderTextColor="#929496"
						placeholder="License Plate"
						onChangeText={(licensePlate) => this.setState({ licensePlate })}
						style={styles.inputBox}
					/>
					<View style={styles.stateRow}>
						<Text style={[ styles.bodyText, styles.darkText ]}>State</Text>
						<Picker
							selectedValue={this.state.stateAbb}
							style={styles.statePicker}
							onValueChange={(stateAbb) => this.setState({ stateAbb })}
							itemStyle={styles.pickerItem}
							prompt="Select a State"
						>
							{this.renderStatePickerItems()}
						</Picker>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={this.props.toggleAddVehicleModal}
							style={[ styles.button, styles.cancelButton ]}
						>
							<Text style={[ styles.buttonText, styles.redText ]}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.handleVinSubmit} style={[ styles.button, styles.submitButton ]}>
							<Text style={[ styles.buttonText, styles.darkText ]}>Submit</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		} else {
			return (
				<View style={styles.loadAnimationContainer}>
					<DotIndicator color="#1c3144" />
					<Text style={styles.bodyText}>Searching for Vehicle Info</Text>
				</View>
			);
		}
	}
}
// <TextInput
// 	placeholderTextColor="#929496"
// 	placeholder="State Abbreviation"
// 	onChangeText={(stateAbb) => this.setState({ stateAbb })}
// 	style={styles.inputBox}
// />;

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#e5e8ec'
	},
	loadAnimationContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	bodyText: {
		fontSize: vh(2.5),
		color: '#1c3144',
		textAlign: 'center',
		fontWeight: 'bold'
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
	pickerItem: {
		fontSize: 30,
		color: '#1c3144',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	statePicker: {
		borderColor: '#929497',
		borderWidth: 1,
		borderRadius: 10,
		width: vw(25),
		color: '#1c3144',
		height: 35
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
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#1c3144',
		borderWidth: 1.5,
		paddingTop: 5,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 5,
		marginRight: vw(20),
		marginLeft: vw(20),
		marginTop: 20,
		marginBottom: 10,
		borderRadius: 30,
		backgroundColor: '#e5e8ec',
		alignContent: 'center'
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
	},
	buttonText: {
		fontSize: vh(2.5),
		textAlign: 'center',
		fontWeight: 'bold'
	},
	stateRow: {
		display: 'flex',
		justifyContent: 'space-around',
		flexDirection: 'row',
		width: vw(75)
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		reduxAddNewVehicle: (vehicle) => dispatch(addNewVehicle(vehicle)),
		reduxSelectVehicle: (vehicle) => dispatch(selectVehicle(vehicle))
	};
};

export default connect(null, mapDispatchToProps)(AddVehicleForm);
