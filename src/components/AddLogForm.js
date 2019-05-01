import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, CheckBox } from 'react-native';
import { connect } from 'react-redux';
import { setVehicles, selectVehicle } from '../store/actions/index.js';

class AddLogForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			titleInput: '',
			descriptionInput: '',
			complete: true,
			mileageInput: null,
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
		if (parseInt(this.state.mileageInput) > 0 && this.state.descriptionInput && this.state.titleInput) {
			this.toggleContent();
			this.postNewLog();
		} else {
			alert('Please fill in all fields.  Mileage must be greater than 0.');
		}
	};

	postNewLog = () => {
		fetch('http://10.137.2.158:5513/api/v1/logs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				title: this.state.titleInput,
				description: this.state.description,
				complete: this.state.complete,
				mileage: this.state.mileageInput,
				vehicle_id: this.props.selectedVehicle.id
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log('new vehicle received with new log');
				this.updateVehicleStates(json);
				this.props.toggleLogModal;
				console.log('after toggle Log modal');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	//update

	updateVehicleStates = (vehicle) => {
		// delete vehicle.user;
		console.log('updating vehicle states');
		this.props.reduxSelectVehicle(vehicle);
		let vehicles = this.props.vehicles.slice();
		updatedVehicles = vehicles.map((v) => {
			if (v.id === vehicle.id) {
				return vehicle;
			} else {
				return v;
			}
		});
		this.props.reduxSetVehicles(updatedVehicles);
	};

	render() {
		if (this.state.showContent) {
			return (
				<View>
					<Text>Enter Log Information</Text>
					<Button onPress={this.handleLogSubmit} title="Submit Log" color="#D46262" />
					<Button onPress={this.props.toggleLogModal} title="Cancel" color="#E6C79C" />
					<TextInput
						style={styles.logInputBox}
						placeholder="Title"
						onChangeText={(titleInput) => this.setState({ titleInput })}
					/>
					<TextInput
						style={styles.logInputBox}
						placeholder="Description"
						onChangeText={(descriptionInput) => this.setState({ descriptionInput })}
					/>
					<TextInput
						style={styles.logInputBox}
						placeholder="Mileage"
						onChangeText={(mileageInput) => this.setState({ mileageInput })}
					/>
					<Text>This maintenance has been performed</Text>
					<CheckBox value={this.state.complete} onValueChange={(complete) => this.setState({ complete })} />
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
		selectedVehicle: state.index.selectedVehicle
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reduxSetVehicles: (vehicles) => dispatch(setVehicles(vehicles)),
		reduxSelectVehicle: (selectedVehicle) => dispatch(selectVehicle(selectedVehicle))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLogForm);
