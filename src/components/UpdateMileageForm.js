import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { setVehicles, selectVehicle } from '../store/actions/index.js';

class UpdateMileageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mileageInput: ''
		};
	}

	handleMileageUpdate = () => {
		if (parseInt(this.state.mileageInput) > 0) {
			fetch(`http://10.137.2.158:5513/api/v1/vehicles/${this.props.selectedVehicle.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					mileage: this.state.mileageInput
				})
			})
				.then((response) => response.json())
				.then((json) => {
					this.updateVehicleStates(json);
				});
		} else {
			alert('Please Enter A Valid Mileage');
		}
	};

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
		alert('Mileage Updated');
	};

	render() {
		return (
			<View>
				<TextInput
					placeholder="Update Vehicle's Mileage"
					onChangeText={(mileageInput) => this.setState({ mileageInput })}
				/>
				<Button onPress={this.handleMileageUpdate} title="Update" color="#D46262" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flexCenter: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMileageForm);
