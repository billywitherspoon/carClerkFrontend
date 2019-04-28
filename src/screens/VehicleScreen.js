import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { setUserInfo, setVehicles, addNewVehicle } from '../store/actions/index.js';

class VehicleScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { columns: 3 };
	}

	renderVehicleList = () => {
		if (this.props.vehicles.length) {
			let vehicles = this.props.vehicles;
			vehicles = props.vehicles.map((v) => {
				delete v.logs;
				delete v.notes;
				return v;
			});
			let lastVehicle = vehicles[vehicles.length - 1];
			lastVehicle = this.removeNulls(lastVehicle);
			return (
				<FlatList
					style={styles.listContainer}
					numColumns={this.state.columns}
					data={Object.keys(lastVehicle)}
					renderItem={({ item }) => {
						return (
							<View style={styles.specItem}>
								<Text>{this.titleize(item)}:</Text>
								<Text>{this.titleize(lastVehicle[item])}</Text>
							</View>
						);
					}}
					keyExtractor={(index) => {
						return index;
					}}
				/>
			);
		} else {
			return <Text>No vehicles added yet</Text>;
		}
	};

	titleize = (sentence) => {
		let titleizeWord = (string) => {
			return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
		};
		if (!sentence.split(/[ _]/g)) return titleizeWord(sentence);
		let splitSentence = sentence.split(/[ _]/g);
		let mappedSplit = splitSentence.map((word) => {
			return titleizeWord(word);
		});
		return mappedSplit.join(' ');
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
		return (
			<View style={styles.flexCenter}>
				<Text>Vehicle Container Page</Text>
				{this.renderVehicleList()}
			</View>
		);
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
		borderColor: 'red',
		borderWidth: 1,
		width: 100,
		height: 100,
		flex: 1,
		flexWrap: 'wrap'
	}
});

const mapStateToProps = (state) => {
	return {
		vehicles: state.index.vehicles,
		userInfo: state.index.userInfo
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reduxSetVehicles: (vehicle) => dispatch(setVehicles(vehicles))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleScreen);
