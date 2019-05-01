import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { selectVehicle } from '../store/actions/index.js';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class VehicleCard extends React.Component {
	constructor(props) {
		super(props);
	}

	handleVehiclePress = () => {
		console.log('vehicle pressed', this.props.vehicle);
		let selectedVehicle = { ...this.props.vehicle };
		this.props.reduxSelectVehicle(selectedVehicle);
		console.log('selected vehicle probably set');
	};

	render() {
		if (this.props.selectedVehicle && this.props.vehicle.id === this.props.selectedVehicle.id) {
			return (
				<TouchableOpacity style={[ styles.selectedVehicleCard, styles.vehicleCard ]}>
					<Text style={[ styles.title, styles.selectedVehicleContent ]}>{this.props.vehicle.name}</Text>
					<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.model_year}</Text>
					<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.make}</Text>
					<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.model}</Text>
					<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.trim}</Text>
					<Text style={[ styles.body, styles.selectedVehicleContent ]}>
						Mileage: {this.props.vehicle.mileage}
					</Text>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity
					style={[ styles.nonSelectedVehicleCard, styles.vehicleCard ]}
					onPress={this.handleVehiclePress}
				>
					<Text style={[ styles.title, styles.nonSelectedVehicleContent ]} onPress={this.handleVehiclePress}>
						{this.props.vehicle.name}
					</Text>
					<Text style={[ styles.body, styles.nonSelectedVehicleContent ]} onPress={this.handleVehiclePress}>
						{this.props.vehicle.model_year}
					</Text>
					<Text style={[ styles.body, styles.nonSelectedVehicleContent ]} onPress={this.handleVehiclePress}>
						{this.props.vehicle.make}
					</Text>
					<Text style={[ styles.body, styles.nonSelectedVehicleContent ]} onPress={this.handleVehiclePress}>
						{this.props.vehicle.model}
					</Text>
					<Text style={[ styles.body, styles.nonSelectedVehicleContent ]} onPress={this.handleVehiclePress}>
						{this.props.vehicle.trim}
					</Text>
					<Text style={[ styles.body, styles.nonSelectedVehicleContent ]} onPress={this.handleVehiclePress}>
						Mileage: {this.props.vehicle.mileage}
					</Text>
				</TouchableOpacity>
			);
		}
	}
}

const styles = StyleSheet.create({
	vehicleCard: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#C9CACA',
		borderWidth: 1
	},
	selectedVehicleCard: {
		backgroundColor: '#c9caca'
	},
	nonSelectedVehicleCard: {
		backgroundColor: '#FFFFFF'
	},
	selectedVehicleContent: {
		color: '#2d3142'
	},
	nonSelectedVehicleContent: {
		color: '#2d3142'
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
