import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ListItem } from 'react-native';

export default class VehicleContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderVehicleList = () => {
		if (this.props.vehicles) {
			let vehicles = this.props.vehicles.map((v) => {
				delete v.logs;
				delete v.notes;
				return v;
			});
			let lastVehicle = vehicles[vehicles.length - 1];
			return (
				<FlatList
					style={styles.flatList}
					data={Object.keys(lastVehicle)}
					renderItem={({ item }) => {
						<Text style={styles.specItem}>{item}</Text>;
					}}
					keyExtractor={(index) => {
						return index;
					}}
				/>
			);
		} else {
			return <Text>User aint got no vehicles</Text>;
		}
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
	flatList: {
		flex: 1
	},
	specItem: {
		borderColor: 'red',
		borderWidth: 1,
		width: 10,
		height: 10
	}
});
