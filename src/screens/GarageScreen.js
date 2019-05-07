import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import AddVehicleModal from '../modals/AddVehicleModal';
import { connect } from 'react-redux';
import { setVehicles, selectVehicle } from '../store/actions/index.js';
import VehicleCard from '../components/VehicleCard';
// import { ScrollView } from 'react-native-gesture-handler';

class GarageScreen extends React.Component {
	static navigationOptions = {
		title: 'Car Clerk',
		headerStyle: {
			backgroundColor: '#2d3142'
		},
		headerTintColor: '#C9CACA',
		headerTitleStyle: {
			fontWeight: 'bold',
			flex: 1,
			alignSelf: 'center',
			justifyContent: 'center',
			textAlign: 'center',
			textAlignVertical: 'center'
		}
	};

	constructor(props) {
		super(props);
		this.state = { displayAddVehicleModal: false };
	}

	componentDidMount = () => {
		fetch(`http://10.137.1.125:5513/api/v1/users/1`)
			.then((response) => response.json())
			.then((json) => {
				console.log('initial fetch successful');

				//remove user info (replace function below with set user info)
				delete json.user;

				// let vehicles = this.removeUserFromVehicleJson(json.vehicles);
				console.log('about to call reduxSetVehicles');

				this.props.reduxSetVehicles(json.vehicles);
				this.props.reduxSelectVehicle(json.vehicles[json.vehicles.length - 1]);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// removeUserFromVehicleJson = (json) => {
	// 	return json.map((v) => {
	// 		delete v.user;
	// 		return v;
	// 	});
	// };

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
				<ScrollView style={styles.vehiclesContainer}>
					{this.renderVehicleCards()}
					<View style={styles.addVehicleButton}>
						<Button onPress={() => this.toggleAddVehicleModal()} title="Add Vehicle" color="#3e885b" />
					</View>
				</ScrollView>
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
	vehiclesContainer: {
		flex: 1
	},
	addVehicleButton: {
		paddingTop: 10,
		width: '50%',
		alignSelf: 'center'
	}
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
		reduxSetVehicles: (vehicles) => dispatch(setVehicles(vehicles)),
		reduxSelectVehicle: (vehicle) => dispatch(selectVehicle(vehicle))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GarageScreen);
