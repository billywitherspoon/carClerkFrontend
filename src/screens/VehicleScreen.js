import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { vw, vh } from 'react-native-expo-viewport-units';

class VehicleScreen extends React.Component {
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
		this.state = { columns: 2 };
	}

	//custom title for a single spec
	renderSpecTitle = (title) => {
		switch (title) {
			case 'displacement_ci':
				return 'Engine Displacement (CI)';
			case 'displacement_l':
				return 'Engine Displacement (L)';
			case 'manufacturer_name':
				return 'Manufacturer';
			case 'fuel_type_primary':
				return 'Fuel Type';
			case 'engine_number_of_cylinders':
				return 'Engine Cylinders';
			case 'brake_system_type':
				return 'Brake System';
			case 'valve_train_design':
				return 'Engine Valve Train';
			case 'vin':
				return 'VIN';
			case 'tpms':
				return 'TPMS';
			case 'transmission_style':
				return 'Transmission';
			case 'plate':
				return 'License Plate';
			case 'plate_state':
				return 'License Plate State';
			default:
				return this.titleize(title);
		}
	};

	//custom info for a single spec
	renderSpecInfo = (title, info) => {
		switch (title) {
			case 'vin':
				return info.toUpperCase();
			case 'plate':
				return info.toUpperCase();
			case 'plate_state':
				return info.toUpperCase();
			default:
				return this.titleize(info);
		}
	};

	renderVehicleInfo = () => {
		if (this.props.selectedVehicle) {
			let vehicle = { ...this.props.selectedVehicle };
			delete vehicle.logs;
			delete vehicle.notes;
			delete vehicle.id;
			delete vehicle.name;
			delete vehicle.auto_image;
			vehicle.displacement_ci = Number.parseInt(vehicle.displacement_ci);
			vehicle.displacement_l = Number.parseFloat(vehicle.displacement_l).toFixed(1);
			let displayVehicle = this.removeNulls(vehicle);
			return (
				<React.Fragment>
					<FlatList
						style={styles.listContainer}
						numColumns={this.state.columns}
						data={Object.keys(displayVehicle)}
						renderItem={({ item }) => {
							return (
								<View style={styles.specItem}>
									<Text style={styles.specHeading}>{this.renderSpecTitle(item)}</Text>
									<Text style={styles.specBody}>
										{this.renderSpecInfo(item, displayVehicle[item])}
									</Text>
								</View>
							);
						}}
						keyExtractor={(index) => {
							return index;
						}}
					/>
				</React.Fragment>
			);
		} else {
			return <Text style={styles.bodyText}>Please add a vehicle</Text>;
		}
	};

	//custom titleize function
	titleize = (sentence) => {
		if (!Number.isInteger(sentence)) {
			let titleizeWord = (string) => {
				return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
			};
			if (!sentence.split(/[ _]/g)) return titleizeWord(sentence);
			let splitSentence = sentence.split(/[ _]/g);
			let mappedSplit = splitSentence.map((word) => {
				return titleizeWord(word);
			});
			return mappedSplit.join(' ');
		} else {
			return sentence;
		}
	};

	//removes any null specs for a vehicle
	removeNulls = (vehicle) => {
		for (const key in vehicle) {
			if (vehicle[key] === null) {
				delete vehicle[key];
			}
		}
		return vehicle;
	};

	render() {
		return <View style={styles.vehicleScreenContainer}>{this.renderVehicleInfo()}</View>;
	}
}

const styles = StyleSheet.create({
	vehicleScreenContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#e5e8ec'
	},
	listContainer: {
		flex: 1,
		width: vw(90)
	},
	specItem: {
		backgroundColor: '#1c3144',
		borderColor: 'transparent',
		borderWidth: 1,
		borderRadius: 30,
		width: 100,
		height: 100,
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		alignContent: 'center',
		padding: 10,
		margin: 5
	},
	specHeading: {
		fontSize: vh(2),
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#e5e8ec'
	},
	specBody: {
		fontSize: vh(2),
		textAlign: 'center',
		color: '#e5e8ec'
	},
	bodyText: {
		fontSize: vh(2.5),
		color: '#1c3144'
	}
});

const mapStateToProps = (state) => {
	return {
		vehicles: state.index.vehicles,
		userInfo: state.index.userInfo,
		selectedVehicle: state.index.selectedVehicle
	};
};

export default connect(mapStateToProps)(VehicleScreen);
