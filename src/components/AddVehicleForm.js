import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { addNewVehicle } from '../store/actions/index.js';

class AddVehicleForm extends Component {
	constructor(props) {
		super(props);
		this.state = { vinText: '', vehicleName: '', showContent: true };
	}

	toggleContent = () => {
		this.setState((prevState) => {
			return {
				showContent: !prevState.showContent
			};
		});
	};

	handleVinSubmit = () => {
		let vin = this.state.vinText.toLowerCase();
		if (vin.length > 9 && vin.length < 18) {
			console.log('valid vin');
			this.toggleContent();
			this.fetchVin(vin);
		} else {
			alert('invalid vin');
		}
	};

	fetchVin = (vin) => {
		fetch('http://10.137.2.158:5513/api/v1/vehicles', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				vin: `${vin}`,
				user_id: 1,
				name: `${this.state.vehicleName}`
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log('received response to new vin post');
				if (json.errors === 'NO MATCH') {
					console.log('return no match');
					alert('Matching Vin Not Found');
					this.toggleContent();
				} else {
					console.log('returned good json');
					// delete json.user;
					this.props.reduxAddNewVehicle(json);
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
				<View>
					<Button onPress={this.handleVinSubmit} title="Submit" color="#D46262" />
					<TextInput placeholder="Enter VIN" onChangeText={(vinText) => this.setState({ vinText })} />
					<TextInput
						placeholder="Enter a nickname for this vehicle"
						onChangeText={(vehicleName) => this.setState({ vehicleName })}
					/>
					<Button onPress={this.props.toggleAddVehicleModal} title="Cancel" color="#E6C79C" />
				</View>
			);
		} else {
			return (
				<View>
					<Text>Looking for submitted Vin...</Text>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		reduxAddNewVehicle: (vehicle) => dispatch(addNewVehicle(vehicle))
	};
};

// const mapStateToProps = (state) => {
// 	return {
// 		vehicles: state.index.vehicles,
// 		userInfo: state.index.userInfo
// 	};
// };

export default connect(null, mapDispatchToProps)(AddVehicleForm);
