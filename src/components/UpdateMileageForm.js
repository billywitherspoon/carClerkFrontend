import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { setVehicles, selectVehicle } from '../store/actions/index.js';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { DotIndicator } from 'react-native-indicators';

class UpdateMileageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mileageInput: '',
			showUpdateMileageContent: true
		};
	}

	handleMileageUpdate = () => {
		mileageInput = this.state.mileageInput.replace(/\D/g, '');
		if (parseInt(mileageInput) > 0 && parseInt(mileageInput) < 1000000) {
			this.toggleUpdateMileageContent();
			fetch(`http://192.168.1.92:5513/api/v1/vehicles/${this.props.selectedVehicle.id}`, {
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
		this.setState({
			mileageInput: ''
		});
		this.toggleUpdateMileageContent();
	};

	toggleUpdateMileageContent = () => {
		this.setState((prevState) => {
			return {
				showUpdateMileageContent: !prevState.showUpdateMileageContent
			};
		});
	};

	renderUpdateMileageContent = () => {
		if (this.state.showUpdateMileageContent) {
			return (
				<React.Fragment>
					<TextInput
						style={styles.inputBox}
						placeholderTextColor="#929496"
						placeholder="Update Vehicle's Mileage"
						onChangeText={(mileageInput) => this.setState({ mileageInput })}
						keyboardType="number-pad"
					/>
					<TouchableOpacity style={styles.updateMileageTouchable} onPress={this.handleMileageUpdate}>
						<Text style={styles.updateMileageText}>Update Mileage</Text>
					</TouchableOpacity>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<DotIndicator color="#1c3144" />
					<Text style={styles.bodyText}>Updating Mileage</Text>
				</React.Fragment>
			);
		}
	};

	render() {
		return <View style={styles.formContainer}>{this.renderUpdateMileageContent()}</View>;
	}
}

const styles = StyleSheet.create({
	formContainer: {
		display: 'flex',
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
	updateMileageTouchable: {
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
	updateMileageText: {
		fontSize: vh(2.5),
		fontWeight: 'bold',
		color: '#1c3144',
		textAlign: 'center'
	},
	bodyText: {
		fontSize: vh(2.5),
		color: '#1c3144',
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
