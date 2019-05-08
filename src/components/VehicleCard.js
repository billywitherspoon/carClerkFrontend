import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
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
					<Image source={{ uri: `${this.props.vehicle.auto_image}` }} style={{ width: 80, height: 40 }} />
					<Text style={[ styles.title, styles.selectedVehicleContent ]}>{this.props.vehicle.name}</Text>
					<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.model_year}</Text>
					<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.make}</Text>
					<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.model}</Text>
					<Text style={[ styles.body, styles.selectedVehicleContent ]}>{this.props.vehicle.trim}</Text>
					<Text style={[ styles.body, styles.selectedVehicleContent ]} onPress={this.handleVehiclePress}>
						{this.props.vehicle.mileage ? this.props.vehicle.mileage + ' miles' : null}
					</Text>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity
					style={[ styles.nonSelectedVehicleCard, styles.vehicleCard ]}
					onPress={this.handleVehiclePress}
				>
					<Image source={{ uri: `${this.props.vehicle.auto_image}` }} style={{ width: 80, height: 40 }} />
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
						{this.props.vehicle.mileage ? this.props.vehicle.mileage + ' miles' : null}
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
		borderWidth: 1,
		padding: 5,
		margin: 10,
		width: vw(60),
		height: vw(60),
		borderRadius: vw(30)
	},
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
