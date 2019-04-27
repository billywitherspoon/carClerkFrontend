import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ListItem } from 'react-native';

export default class VehicleContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { columns: 3, vehicles: null };
	}

	componentWillReceiveProps = (props) => {
		let vehicles = [];
		if (props.vehicles.length) {
			vehicles = props.vehicles.map((v) => {
				delete v.logs;
				delete v.notes;
				return v;
			});
			this.setState({
				vehicles
			});
		}
	};

	renderVehicleList = () => {
		if (this.state.vehicles) {
			let vehicles = this.state.vehicles;
			let lastVehicle = vehicles[vehicles.length - 1];
			lastVehicle = this.cleanVehicleObject(lastVehicle);
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
		} else if (this.state.vehicles === null) {
			return null;
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

	cleanVehicleObject = (vehicle) => {
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
