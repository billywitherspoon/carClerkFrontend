import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
// import { setVehicles, selectVehicle } from '../store/actions/index.js';
import UpdateMileageForm from '../components/UpdateMileageForm';
import LogModal from '../modals/LogModal';

//update

class LogsScreen extends React.Component {
	static navigationOptions = {
		title: 'Car Clerk',
		headerStyle: {
			backgroundColor: '#2d3142'
		},
		headerTintColor: '#bfc0c0',
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
		this.state = { displayLogModal: false };
	}

	toggleLogModal = () => {
		this.setState((prevState) => {
			return {
				displayLogModal: !prevState.displayLogModal
			};
		});
		console.log('Log Modal Toggled');
	};

	renderLogs = () => {
		return this.props.selectedVehicle.logs.map((log) => {
			return (
				<View style={styles.logItem} key={Math.random()}>
					<Text>Title: {log.title}</Text>
					<Text>Description: {log.description}</Text>
					<Text>Mileage: {log.mileage}</Text>
					<Text>Completed?: {log.complete}</Text>
				</View>
			);
		});
	};

	render() {
		if (this.props.selectedVehicle) {
			return (
				<View>
					<Button onPress={() => this.toggleLogModal()} title="Add a New Log" color="green" />
					<UpdateMileageForm />
					<ScrollView>{this.renderLogs()}</ScrollView>
					<LogModal display={this.state.displayLogModal} toggleLogModal={this.toggleLogModal} />
				</View>
			);
		} else {
			return <Text>Select a vehicle</Text>;
		}
	}
}

const styles = StyleSheet.create({
	flexCenter: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	logItem: {
		borderColor: 'black',
		borderWidth: 0.5,
		borderRadius: 0.5
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
// 		reduxSetVehicles: (vehicles) => dispatch(setVehicles(vehicles)),
// 		reduxSelectVehicle: (selectedVehicle) => dispatch(selectVehicle(selectedVehicle))
// 	};
// };

export default connect(mapStateToProps)(LogsScreen);
