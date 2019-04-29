import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AddVehicleModal from '../modals/AddVehicleModal';
import { connect } from 'react-redux';
import { setUserInfo, setVehicles, addNewVehicle } from '../store/actions/index.js';

class GarageScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { displayAddVehicleModal: false };
	}

	componentDidMount = () => {
		fetch(`http://10.137.5.73:0430/api/v1/users/1`)
			.then((response) => response.json())
			.then((json) => {
				console.log('initial fetch successful, json');
				let vehicles = this.removeUserFromVehicleJson(json.vehicles);
				//set user info here
				delete vehicles.user;
				console.log('about to call reduxSetVehicles, current vehicles:', vehicles);
				this.props.reduxSetVehicles(vehicles);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	removeUserFromVehicleJson = (json) => {
		return json.map((v) => {
			delete v.user;
			return v;
		});
	};

	toggleAddVehicleModal = () => {
		this.setState((prevState) => {
			return {
				displayAddVehicleModal: !prevState.displayAddVehicleModal
			};
		});
		console.log('Add Vehicle Modal Toggled');
	};

	render() {
		return (
			<View>
				<Text>GarageContainer</Text>
				<Button onPress={() => this.toggleAddVehicleModal()} title="Add a New Vehicle" color="green" />
				<AddVehicleModal
					display={this.state.displayAddVehicleModal}
					toggleAddVehicleModal={this.toggleAddVehicleModal}
				/>
			</View>
		);
	}
}

//update

const styles = StyleSheet.create({
	flexCenter: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

const mapStateToProps = (state) => {
	return {
		vehicles: state.index.vehicles,
		userInfo: state.index.userInfo
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reduxSetVehicles: (vehicles) => dispatch(setVehicles(vehicles))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GarageScreen);
