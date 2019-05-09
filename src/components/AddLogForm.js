import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { setVehicles, selectVehicle, updateActiveLog } from '../store/actions/index.js';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { DotIndicator } from 'react-native-indicators';

class AddLogForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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

	handleLogSubmit = () => {
		if (this.props.activeLog.title) {
			mileageInput = this.props.activeLog.mileage.toString().replace(/\D/g, '');
			if (parseInt(mileageInput) > 0 && parseInt(mileageInput) < 1000000) {
				if (this.props.activeLog.id) {
					this.updateLog(mileageInput);
				} else {
					this.postNewLog(mileageInput);
				}
				this.toggleContent();
			} else {
				alert('Please enter a Mileage between 1 and 999,999');
			}
		} else {
			alert('Please enter a Title for this log');
		}
	};

	updateLog = (mileageInput) => {
		fetch(`http://10.137.7.125:5513/api/v1/logs/${this.props.activeLog.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				title: this.props.activeLog.title,
				description: this.props.activeLog.description,
				mileage: mileageInput,
				vehicle_id: this.props.selectedVehicle.id
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log('new vehicle received with new log');
				this.props.toggleLogModal();
				console.log('right after toggle Log modal call');
				this.updateVehicleStates(json);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	postNewLog = (mileageInput) => {
		fetch('http://10.137.7.125:5513/api/v1/logs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				title: this.props.activeLog.title,
				description: this.props.activeLog.description,
				mileage: mileageInput,
				vehicle_id: this.props.selectedVehicle.id
				// complete: this.state.complete
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log('new vehicle received with new log');
				this.props.toggleLogModal();
				console.log('right after toggle Log modal call');
				this.updateVehicleStates(json);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	updateVehicleStates = (vehicle) => {
		console.log('updating vehicle states');
		this.props.reduxSelectVehicle(vehicle);
		let updatedVehicles = this.props.vehicles.map((v) => {
			if (v.id === vehicle.id) {
				return vehicle;
			} else {
				return v;
			}
		});
		this.props.reduxSetVehicles(updatedVehicles);
	};

	mileageValue = () => {
		if (this.props.activeLog.mileage) {
			return this.props.activeLog.mileage.toString();
		} else {
			return null;
		}
	};

	render() {
		if (this.state.showContent) {
			return (
				<View style={styles.formContainer}>
					<Text style={[ styles.bodyText, styles.darkText ]}>Log Title</Text>
					<TextInput
						placeholderTextColor="#929496"
						style={styles.inputBox}
						placeholder="Title"
						value={this.props.activeLog.title}
						onChangeText={(title) => this.props.reduxUpdateActiveLog({ title: title })}
					/>
					<Text style={[ styles.bodyText, styles.darkText ]}>Log Mileage</Text>
					<TextInput
						placeholderTextColor="#929496"
						keyboardType="number-pad"
						style={styles.inputBox}
						placeholder="Mileage"
						value={this.mileageValue()}
						onChangeText={(mileage) => this.props.reduxUpdateActiveLog({ mileage: mileage })}
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={this.props.toggleLogModal}
							style={[ styles.button, styles.cancelButton ]}
						>
							<Text style={[ styles.buttonText, styles.redText ]}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.handleLogSubmit} style={[ styles.button, styles.submitButton ]}>
							<Text style={[ styles.buttonText, styles.darkText ]}>Submit</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		} else {
			return (
				<View style={styles.loadAnimationContainer}>
					<DotIndicator color="#1c3144" />
					<Text style={styles.bodyText}>Submitting Log</Text>
				</View>
			);
		}
	}
}

// <TextInput
// 	style={styles.logInputBox}
// 	placeholder="Description"
// 	value={this.props.activeLog.description}
// 	onChangeText={(description) => this.props.reduxUpdateActiveLog({ description: description })}
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
	loadAnimationContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
	buttonText: {
		fontSize: vh(2.5),
		textAlign: 'center',
		fontWeight: 'bold'
	},
	bodyText: {
		fontSize: vh(2.5),
		color: '#1c3144',
		textAlign: 'center',
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
	}
});

const mapStateToProps = (state) => {
	return {
		vehicles: state.index.vehicles,
		userInfo: state.index.userInfo,
		selectedVehicle: state.index.selectedVehicle,
		activeLog: state.index.activeLog
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reduxSetVehicles: (vehicles) => dispatch(setVehicles(vehicles)),
		reduxSelectVehicle: (selectedVehicle) => dispatch(selectVehicle(selectedVehicle)),
		reduxUpdateActiveLog: (logAttribute) => dispatch(updateActiveLog(logAttribute))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLogForm);
