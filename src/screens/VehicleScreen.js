import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
// import { setUserInfo, setVehicles, addNewVehicle } from '../store/actions/index.js';

class VehicleScreen extends React.Component {
	static navigationOptions = {
		title: 'Car Clerk',
		headerStyle: {
			backgroundColor: '#2d3142'
		},
		headerTintColor: '#C9CACA',
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
		this.state = { columns: 3 };
	}

	renderVehicleInfo = () => {
		if (this.props.selectedVehicle) {
			let vehicle = { ...this.props.selectedVehicle };
			delete vehicle.logs;
			delete vehicle.notes;
			delete vehicle.id;
			let vehicleName = vehicle.name;
			delete vehicle.name;
			let displayVehicle = this.removeNulls(vehicle);
			return (
				<React.Fragment>
					<Text>{vehicleName}</Text>
					<FlatList
						style={styles.listContainer}
						numColumns={this.state.columns}
						data={Object.keys(displayVehicle)}
						renderItem={({ item }) => {
							return (
								<View style={styles.specItem}>
									<Text>{this.titleize(item)}:</Text>
									<Text>{this.titleize(displayVehicle[item])}</Text>
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
		width: 300
	},
	specItem: {
		borderColor: '#D3D3D3',
		borderWidth: 1,
		width: 100,
		height: 100,
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'space-around'
	}
});

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
