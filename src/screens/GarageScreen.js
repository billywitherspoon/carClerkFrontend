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
			backgroundColor: '#1c3144'
		},
		headerTintColor: '#e5e8ec',
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
		fetch(`http://10.137.7.125:5513/api/v1/users/1`)
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
					<TouchableOpacity style={styles.addVehicleTouchable} onPress={() => this.toggleAddVehicleModal()}>
						<Text style={styles.addVehicleText}>Add a Car to Your Garage</Text>
					</TouchableOpacity>
					<ScrollView
						contentContainerStyle={{
							width: vw(100)
						}}
					>
						{this.renderVehicleCards()}
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
		backgroundColor: '#e5e8ec'
	},
	addVehicleTouchable: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#1c3144',
		borderWidth: 1,
		paddingTop: 5,
		paddingLeft: 20,
		paddingRight: 20,
		marginRight: vw(20),
		marginLeft: vw(20),
		marginTop: 15,
		marginBottom: 15,
		borderRadius: 30,
		backgroundColor: '#e5e8ec',
		alignContent: 'center'
	},
	addVehicleText: {
		fontSize: vh(2.5),
		color: '#1c3144',
		textAlign: 'center'
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
		reduxSelectVehicle: (vehicle) => dispatch(selectVehicle(vehicle))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GarageScreen);
