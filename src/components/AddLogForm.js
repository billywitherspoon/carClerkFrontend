import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, CheckBox } from 'react-native';
import { connect } from 'react-redux';
import { setVehicles, selectVehicle, updateActiveLog } from '../store/actions/index.js';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class AddLogForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// titleInput: null,
			// descriptionInput: null,
			// mileageInput: null,
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
		if (parseInt(this.props.activeLog.mileage) > 0 && this.props.activeLog.title) {
			if (this.props.activeLog.id) {
				this.updateLog();
			} else {
				this.postNewLog();
			}
			this.toggleContent();
		} else {
			alert('Please fill in all fields.  Mileage must be greater than 0.');
		}
	};

	updateLog = () => {
		fetch(`http://10.137.1.80:5513/api/v1/logs/${this.props.activeLog.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				title: this.props.activeLog.title,
				description: this.props.activeLog.description,
				mileage: this.props.activeLog.mileage,
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

	postNewLog = () => {
		fetch('http://10.137.1.80:5513/api/v1/logs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				title: this.props.activeLog.title,
				description: this.props.activeLog.description,
				mileage: this.props.activeLog.mileage,
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
		// let vehicles = this.props.vehicles.slice();
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
				<View>
					<Text>Enter Log Information</Text>
					<Button onPress={this.handleLogSubmit} title="Submit Log" color="#3f7cac" />
					<Button onPress={this.props.toggleLogModal} title="Cancel" color="#c33149" />
					<TextInput
						style={styles.logInputBox}
						placeholder="Title"
						value={this.props.activeLog.title}
						onChangeText={(title) => this.props.reduxUpdateActiveLog({ title: title })}
					/>
					<TextInput
						keyboardType="number-pad"
						style={styles.logInputBox}
						placeholder="Mileage"
						value={this.mileageValue()}
						onChangeText={(mileage) => this.props.reduxUpdateActiveLog({ mileage: mileage })}
					/>
				</View>
			);
		} else {
			return (
				<View>
					<Text>Submitting Log...</Text>
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
	flexCenter: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		color: 'black'
	},
	logInputBox: {
		borderWidth: 2,
		borderRadius: 1,
		borderColor: 'black'
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
