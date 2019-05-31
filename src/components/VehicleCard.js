import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { selectVehicle } from '../store/actions/index.js';
import { vw, vh } from 'react-native-expo-viewport-units';

class VehicleCard extends React.Component {
	constructor(props) {
		super(props);
	}

	//handles press of a new selected vehicle
	//uses redux to update selected vehicle to the vehicle card pressed
	//uses react navigator to switch to the logs screen
	handleVehiclePress = () => {
		this.props.navigateToLogsScreen();
		console.log('vehicle pressed', this.props.vehicle);
		if (this.props.vehicle.id !== this.props.selectedVehicle.id) {
			let selectedVehicle = { ...this.props.vehicle };
			this.props.reduxSelectVehicle(selectedVehicle);
			console.log('selected vehicle set');
		}
	};

	render() {
		return (
			<TouchableOpacity style={styles.singleCardContainer} onPress={this.handleVehiclePress} activeOpacity={1}>
				<Card
					containerStyle={[ styles.selectedVehicleCard, styles.vehicleCard ]}
					title={this.props.vehicle.name}
					image={{ uri: `${this.props.vehicle.auto_image}` }}
					titleStyle={[ styles.title, styles.selectedVehicleContent ]}
					imageStyle={styles.cardImage}
				>
					<View style={styles.bodyContainer}>
						<Text style={[ styles.body, styles.selectedVehicleContent ]}>
							{this.props.vehicle.model_year}
						</Text>
						<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.make}</Text>
						<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.model}</Text>
						<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.trim}</Text>
						<Text style={[ styles.body, styles.selectedVehicleContent ]}>
							{this.props.vehicle.mileage + ' miles'}
						</Text>
					</View>
				</Card>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	singleCardContainer: {
		flex: 1,
		marginTop: -5
	},
	bodyContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	},
	vehicleCard: {
		alignSelf: 'stretch',
		borderColor: 'transparent',
		borderWidth: 1,
		borderRadius: 30,
		marginLeft: 40,
		marginRight: 40
	},
	cardImage: {},
	selectedVehicleCard: {
		// backgroundColor: '#6e7e81'
		backgroundColor: '#1c3144'
	},
	nonSelectedVehicleCard: {
		backgroundColor: '#3f88c5'
	},
	selectedVehicleContent: {
		// color: '#1c3144'
		color: '#e5e8ec'
	},
	nonSelectedVehicleContent: {
		color: '#e5e8ec'
	},
	title: {
		fontSize: vh(3),
		fontWeight: 'bold'
	},
	body: {
		fontSize: vh(2.5)
	}
});

//update

const mapStateToProps = (state) => {
	return {
		vehicles: state.index.vehicles,
		userInfo: state.index.userInfo,
		selectedVehicle: state.index.selectedVehicle
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reduxSelectVehicle: (selectedVehicle) => dispatch(selectVehicle(selectedVehicle))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleCard);
