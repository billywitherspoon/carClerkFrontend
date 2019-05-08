import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { selectVehicle } from '../store/actions/index.js';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class VehicleCard extends React.Component {
	constructor(props) {
		super(props);
	}

	handleVehiclePress = () => {
		this.props.navigateToLogsScreen();
		console.log('vehicle pressed', this.props.vehicle);
		let selectedVehicle = { ...this.props.vehicle };
		this.props.reduxSelectVehicle(selectedVehicle);
		console.log('selected vehicle probably set');
	};

	render() {
		if (this.props.selectedVehicle && this.props.vehicle.id === this.props.selectedVehicle.id) {
			return (
				<TouchableOpacity style={styles.singleCardContainer} activeOpacity={1}>
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
							<Text style={[ styles.body, styles.selectedVehicleContent ]}>
								{this.props.vehicle.make}
							</Text>
							<Text style={[ styles.body, styles.selectedVehicleContent ]}>
								{this.props.vehicle.model}
							</Text>
							<Text style={[ styles.body, styles.selectedVehicleContent ]}>
								{this.props.vehicle.trim}
							</Text>
							<Text style={[ styles.body, styles.selectedVehicleContent ]}>
								{this.props.vehicle.mileage + ' miles'}
							</Text>
						</View>
					</Card>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity
					style={styles.singleCardContainer}
					onPress={this.handleVehiclePress}
					activeOpacity={1}
				>
					<Card
						containerStyle={[ styles.nonSelectedVehicleCard, styles.vehicleCard ]}
						title={this.props.vehicle.name}
						image={{ uri: `${this.props.vehicle.auto_image}` }}
						titleStyle={[ styles.title, styles.nonSelectedVehicleContent ]}
						imageStyle={styles.cardImage}
					>
						<View style={styles.bodyContainer}>
							<Text style={[ styles.body, styles.nonSelectedVehicleContent ]}>
								{this.props.vehicle.model_year}
							</Text>
							<Text style={[ styles.body, styles.nonSelectedVehicleContent ]}>
								{this.props.vehicle.make}
							</Text>
							<Text style={[ styles.body, styles.nonSelectedVehicleContent ]}>
								{this.props.vehicle.model}
							</Text>
							<Text style={[ styles.body, styles.nonSelectedVehicleContent ]}>
								{this.props.vehicle.trim}
							</Text>
							<Text style={[ styles.body, styles.nonSelectedVehicleContent ]}>
								{this.props.vehicle.mileage + ' miles'}
							</Text>
						</View>
					</Card>
				</TouchableOpacity>
			);
		}
	}
}

const styles = StyleSheet.create({
	singleCardContainer: {
		flex: 1
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
		borderColor: '#C9CACA',
		borderWidth: 1,
		borderRadius: 30,
		marginLeft: 40,
		marginRight: 40
	},
	cardImage: {},
	selectedVehicleCard: {
		backgroundColor: '#6e7e81'
	},
	nonSelectedVehicleCard: {
		backgroundColor: '#93a8ac'
	},
	selectedVehicleContent: {
		color: '#bdc1c5'
	},
	nonSelectedVehicleContent: {
		color: '#4c5760'
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
