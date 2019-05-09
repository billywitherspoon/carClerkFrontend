import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
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
		mileageInput = this.state.mileageInput.replace(/\D/g, '');
		if (parseInt(mileageInput) > 0 && parseInt(mileageInput) < 1000000) {
			this.toggleUpdateMileageButton();
			fetch(`http://10.137.7.125:5513/api/v1/vehicles/${this.props.selectedVehicle.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					mileage: mileageInput
				})
			})
				.then((response) => response.json())
				.then((json) => {
					this.updateVehicleStates(json);
				});
		} else {
			alert('Please enter a Mileage between 1 and 999,999');
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
		this.setState({
			mileageInput: ''
		});
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
			return (
				<TouchableOpacity style={styles.updateMileageTouchable} onPress={this.handleMileageUpdate}>
					<Text style={styles.updateMileageText}>Update</Text>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	};

	render() {
		return (
			<View style={styles.formContainer}>
				<TextInput
					style={styles.inputBox}
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
	formContainer: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	inputBox: {
		borderColor: '#C9CACA',
		borderWidth: 1,
		borderRadius: 10,
		width: vw(75),
		color: '#e5e8ec',
		fontSize: 15,
		paddingLeft: 15
	},
	updateMileageTouchable: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: 'transparent',
		borderWidth: 1,
		paddingTop: 5,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 5,
		marginRight: vw(20),
		marginLeft: vw(20),
		marginTop: 15,
		marginBottom: 15,
		borderRadius: 30,
		backgroundColor: '#3f88c5',
		alignContent: 'center'
	},
	updateMileageText: {
		fontSize: vh(2.5),
		color: '#e5e8ec',
		textAlign: 'center',
		fontWeight: 'bold'
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
