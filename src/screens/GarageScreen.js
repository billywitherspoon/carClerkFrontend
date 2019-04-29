import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import AddVehicleModal from '../modals/AddVehicleModal';
import { connect } from 'react-redux';
import { setVehicles } from '../store/actions/index.js';
import VehicleCard from '../components/VehicleCard';
// import { ScrollView } from 'react-native-gesture-handler';

class GarageScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { displayAddVehicleModal: false };
	}

	componentDidMount = () => {
		fetch(`http://10.137.5.73:5513/api/v1/users/1`)
			.then((response) => response.json())
			.then((json) => {
				console.log('initial fetch successful, json');

				//remove user info (replace function below with set user info)
				delete json.user;

				let vehicles = this.removeUserFromVehicleJson(json.vehicles);
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

	renderVehicleCards = () => {
		console.log('about to render vehicles');
		let vehicles = this.props.vehicles.slice().reverse();
		return vehicles.map((v) => {
			return <VehicleCard vehicle={v} key={Math.random()} />;
		});
	};

	render() {
		return (
			<View style={styles.flexCenter}>
				<Text>GarageContainer</Text>
				<Button onPress={() => this.toggleAddVehicleModal()} title="Add a New Vehicle" color="green" />
				<ScrollView style={styles.vehiclesContainer}>{this.renderVehicleCards()}</ScrollView>
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
		flex: 1
	},
	vehiclesContainer: {}
});

// vehiclesContainer: {
// 	paddingBottom: '5'
// }
const mapStateToProps = (state) => {
	return {
		vehicles: state.index.vehicles,
		userInfo: state.index.userInfo,
		selectedVehicle: state.index.selectedVehicle
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reduxSetVehicles: (vehicles) => dispatch(setVehicles(vehicles))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GarageScreen);
