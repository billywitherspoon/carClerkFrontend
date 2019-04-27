import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GarageContainer from './GarageContainer';
import LogsContainer from './LogsContainer';
import VehicleContainer from './VehicleContainer';

class MainContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: 1,
			userInfo: null,
			vehicles: null
		};
	}

	componentDidMount = () => {
		fetch(`http://192.168.1.14:5555/api/v1/users/${this.state.userId}`)
			.then((response) => response.json())
			.then((json) => {
				console.log('fetch successful');
				console.log(json);
				this.initializeVehiclesState(json.vehicles);
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

	updateVehiclesState = (json) => {
		delete json.user;
		console.log('updating vehicle state with new vehicle:', json);
		this.setState((prevState) => {
			return { vehicles: [ ...prevState.vehicles, json ] };
		});
	};

	initializeVehiclesState = (json) => {
		let vehicles = this.removeUserFromVehicleJson(json);
		this.setState({
			vehicles: vehicles
		});
	};

	// removeLogsAndNotes = () => {
	// 	return this.state.vehicles.map((v) => {
	// 		delete v.logs;
	// 		delete v.notes;
	// 		return v;
	// 	});
	// };

	renderSubContainer = () => {
		if (this.props.activeContainer === 'Vehicle') {
			return <VehicleContainer vehicles={this.state.vehicles} />;
		} else if (this.props.activeContainer === 'Logs') {
			return <LogsContainer />;
		} else {
			return <GarageContainer updateVehiclesState={this.updateVehiclesState} />;
		}
	};

	render() {
		return <View style={styles.flexCenter}>{this.renderSubContainer()}</View>;
	}
}

export default MainContainer;

const styles = StyleSheet.create({
	flexCenter: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
