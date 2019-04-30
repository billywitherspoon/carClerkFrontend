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
		fetch(`http://10.137.5.73:5513/api/v1/vehicles/${this.props.selectedVehicle.id}`, {
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
	};

	updateVehicleStates = (vehicle) => {
		delete vehicle.user;
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
		return (
			<View style={styles.flexCenter}>
				<TextInput
					placeholder="Update Vehicle's Mileage"
					onChangeText={(mileageInput) => this.setState({ mileageInput })}
				/>
				<Button onPress={this.handleMileageUpdate} title="Update" color="blue" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flexCenter: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
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
