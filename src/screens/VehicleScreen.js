import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import { setUserInfo, setVehicles, addNewVehicle } from '../store/actions/index.js';

class VehicleScreen extends React.Component {
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
		this.state = { columns: 2 };
	}

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
									<Text />
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
			return <Text>Select a vehicle</Text>;
		}
	};

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

	removeNulls = (vehicle) => {
		for (const key in vehicle) {
			if (vehicle[key] === null) {
				delete vehicle[key];
			}
		}
		return vehicle;
	};

	render() {
		return <View style={styles.flexCenter}>{this.renderVehicleInfo()}</View>;
	}
}

const styles = StyleSheet.create({
	flexCenter: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	listContainer: {
		flex: 1,
		width: vw(90)
	},
	specItem: {
		backgroundColor: '#93a8ac',
		borderColor: '#C9CACA',
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
		margin: 5,
		shadowColor: '#000000'
	},
	specHeading: {
		fontSize: vh(2),
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#4c5760'
	},
	specBody: {
		fontSize: vh(1.75),
		textAlign: 'center',
		color: '#4c5760'
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

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		reduxSetVehicles: (vehicles) => dispatch(setVehicles(vehicles))
// 	};
// };

export default connect(mapStateToProps)(VehicleScreen);
