import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { setVehicles, selectVehicle } from '../store/actions/index.js';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class UpdateMileageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mileageInput: '',
			showUpdateMileageButton: true
		};
	}

	handleMileageUpdate = () => {
		if (parseInt(this.state.mileageInput) > 0) {
			this.toggleUpdateMileageButton();
			fetch(`http://10.137.7.171:5513/api/v1/vehicles/${this.props.selectedVehicle.id}`, {
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
		alert('Mileage Updated ✓');
		this.toggleUpdateMileageButton();
	};

	toggleUpdateMileageButton = () => {
		this.setState((prevState) => {
			return {
				showUpdateMileageButton: !prevState.showUpdateMileageButton
			};
		});
	};

	renderUpdateMileageButton = () => {
		if (this.state.showUpdateMileageButton) {
			return <Button onPress={this.handleMileageUpdate} title="Update" color="#3f7cac" />;
		} else {
			return null;
		}
	};

	render() {
		return (
			<View>
				<TextInput
					placeholder="Update Vehicle's Mileage"
					onChangeText={(mileageInput) => this.setState({ mileageInput })}
					keyboardType="number-pad"
				/>
				{this.renderUpdateMileageButton()}
			</View>
		);
	}
}
//update

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
