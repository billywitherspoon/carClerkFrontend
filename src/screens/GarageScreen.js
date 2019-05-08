import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import AddVehicleModal from '../modals/AddVehicleModal';
import { connect } from 'react-redux';
import { setVehicles, selectVehicle } from '../store/actions/index.js';
import VehicleCard from '../components/VehicleCard';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import { ScrollView } from 'react-native-gesture-handler';

class GarageScreen extends React.Component {
	static navigationOptions = {
		title: 'Car Clerk',
		headerStyle: {
			backgroundColor: '#bdc1c5'
		},
		headerTintColor: '#4c5760',
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
		this.state = { displayAddVehicleModal: false, displayContent: false };
	}

	componentDidMount = () => {
		fetch(`http://10.137.7.171:5513/api/v1/users/1`)
			.then((response) => response.json())
			.then((json) => {
				console.log('initial fetch successful');

				//remove user info (replace function below with set user info)
				delete json.user;

				// let vehicles = this.removeUserFromVehicleJson(json.vehicles);
				console.log('about to call reduxSetVehicles');

				this.props.reduxSetVehicles(json.vehicles);
				this.props.reduxSelectVehicle(json.vehicles[json.vehicles.length - 1]);
				this.setState({
					displayContent: true
				});
			})
			.catch((error) => {
				this.setState({
					displayContent: true
				});
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
			return <VehicleCard vehicle={v} key={Math.random()} navigateToLogsScreen={this.navigateToLogsScreen} />;
		});
	};

	navigateToLogsScreen = () => {
		this.props.navigation.navigate('Logs');
	};

	render() {
		if (this.state.displayContent) {
			return (
				<View style={styles.screenContainer}>
					<ScrollView
						contentContainerStyle={{
							flexGrow: 1,
							alignItems: 'center',
							width: vw(100)
						}}
					>
						{this.renderVehicleCards()}
						<TouchableOpacity
							style={styles.addVehicleTouchable}
							onPress={() => this.toggleAddVehicleModal()}
						>
							<Text style={styles.addVehicleText}>Add a Car to Your Garage</Text>
						</TouchableOpacity>
					</ScrollView>
					<AddVehicleModal
						display={this.state.displayAddVehicleModal}
						toggleAddVehicleModal={this.toggleAddVehicleModal}
					/>
				</View>
			);
		} else {
			return null;
		}
	}
}

//update

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: '#eae6e5',
		alignItems: 'center'
	},
	addVehicleTouchable: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#C9CACA',
		borderWidth: 1,
		paddingTop: 15,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 15,
		margin: 15,
		width: vw(40),
		height: vw(20),
		borderRadius: 30,
		backgroundColor: '#93a8ac',
		alignContent: 'center'
	},
	addVehicleText: {
		fontSize: vh(2.5),
		color: '#4c5760',
		textAlign: 'center',
		fontWeight: 'bold'
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
