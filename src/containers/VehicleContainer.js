import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ListItem } from 'react-native';

export default class VehicleContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { columns: 1, vehicles: '' };
	}

	// componentWillReceiveProps = (props) => {
	// 	this.setState({
	// 		vehicles: props.vehicles
	// 	});
	// };

	renderVehicleList = () => {
		if (this.state.vehicles) {
			let vehicles = this.state.vehicles.map((v) => {
				delete v.logs;
				delete v.notes;
				return v;
			});
			let lastVehicle = vehicles[vehicles.length - 1];
			return (
				<FlatList
					style={styles.listContainer}
					numColumns={this.state.columns}
					data={Object.keys(lastVehicle)}
					renderItem={({ item }) => {
						return (
							<View style={styles.specItem}>
								<Text>{item}</Text>
								<Text>{lastVehicle[item]}</Text>
							</View>
						);
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
