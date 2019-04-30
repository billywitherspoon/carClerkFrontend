import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { selectVehicle } from '../store/actions/index.js';

class VehicleCard extends React.Component {
	constructor(props) {
		super(props);
	}

	handleVehiclePress = () => {
		console.log('vehicle pressed, id:', this.props.vehicle);
		let selectedVehicle = { ...this.props.vehicle };
		this.props.reduxSelectVehicle(selectedVehicle);
		console.log('selected vehicle probably set');
	};

	renderVehicleCard = () => {
		if (this.props.selectedVehicle && this.props.vehicle.id === this.props.selectedVehicle.id) {
			console.log('vehicle card matches selected vehicle');
			return (
				<View style={styles.flexCenter}>
					<Text style={styles.isSelectedVehicle} onPress={this.handleVehiclePress}>
						{this.props.vehicle.name}
					</Text>
					<Text style={styles.isSelectedVehicle} onPress={this.handleVehiclePress}>
						{this.props.vehicle.model_year}
					</Text>
					<Text style={styles.isSelectedVehicle} onPress={this.handleVehiclePress}>
						{this.props.vehicle.make}
					</Text>
					<Text style={styles.isSelectedVehicle} onPress={this.handleVehiclePress}>
						{this.props.vehicle.model}
					</Text>
					<Text style={styles.isSelectedVehicle} onPress={this.handleVehiclePress}>
						{this.props.vehicle.trim}
					</Text>
					<Text style={styles.isSelectedVehicle} onPress={this.handleVehiclePress}>
						{this.props.vehicle.mileage}
					</Text>
				</View>
			);
		} else {
			return (
				<View style={styles.flexCenter}>
					<Text onPress={this.handleVehiclePress}>{this.props.vehicle.name}</Text>
					<Text onPress={this.handleVehiclePress}>{this.props.vehicle.model_year}</Text>
					<Text onPress={this.handleVehiclePress}>{this.props.vehicle.make}</Text>
					<Text onPress={this.handleVehiclePress}>{this.props.vehicle.model}</Text>
					<Text onPress={this.handleVehiclePress}>{this.props.vehicle.trim}</Text>
					<Text onPress={this.handleVehiclePress}>{this.props.vehicle.mileage}</Text>
				</View>
			);
		}
	};

	render() {
		return (
			<View style={styles.vehicleCard} onPress={this.handleVehiclePress}>
				{this.renderVehicleCard()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	vehicleCard: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#D3D3D3',
		borderWidth: 1
	},
	isSelectedVehicle: {
		color: 'blue'
	},
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
