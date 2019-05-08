import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import UpdateMileageForm from '../components/UpdateMileageForm';
import LogModal from '../modals/LogModal';
import Swipeout from 'react-native-swipeout';
import { setActiveLog, setVehicles, selectVehicle } from '../store/actions/index.js';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

//buttons for swipe

class LogsScreen extends React.Component {
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
		this.state = {
			displayLogModal: false
		};
	}

	toggleLogModal = () => {
		this.setState((prevState) => {
			return {
				displayLogModal: !prevState.displayLogModal
			};
		});
		console.log('Log Modal Toggled');
	};

	updateLogAsCompleted = (log) => {
		let logCopy = { ...log };
		logCopy.complete = !logCopy.complete;
		console.log('updating log as complete');
		let updatedVehicle = { ...this.props.selectedVehicle };
		updatedVehicle.logs = this.props.selectedVehicle.logs.map((l) => {
			if (l.id === logCopy.id) {
				return logCopy;
			} else {
				return l;
			}
		});
		this.updateVehicleStates(updatedVehicle);
		this.updateLogFetch(logCopy);
	};

	deleteLog = (log) => {
		console.log('deleting log:', log);
		let updatedVehicle = { ...this.props.selectedVehicle };
		updatedVehicle.logs = updatedVehicle.logs.filter((l) => {
			return l != log;
		});
		this.updateVehicleStates(updatedVehicle);
		this.deleteLogFetch(log);
	};

	deleteLogFetch = (log) => {
		fetch(`http://10.137.7.171:5513/api/v1/logs/${log.id}`, {
			method: 'DELETE'
		});
	};

	updateLogFetch = (logCopy) => {
		fetch(`http://10.137.7.171:5513/api/v1/logs/${logCopy.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				complete: logCopy.complete
			})
		});
	};

	updateVehicleStates = (updatedVehicle) => {
		this.props.reduxSelectVehicle(updatedVehicle);
		let updatedVehicles = this.props.vehicles.map((v) => {
			if (v.id === updatedVehicle.id) {
				return updatedVehicle;
			} else {
				return v;
			}
		});
		this.props.reduxSetVehicles(updatedVehicles);
	};

	renderLogs = () => {
		return this.props.selectedVehicle.logs.map((log) => {
			return (
				<Swipeout
					autoClose={true}
					backgroundColor={log.complete ? '#3e885b' : '#ffffff'}
					left={[
						{
							text: 'Completed',
							backgroundColor: '#3e885b',
							onPress: () => {
								console.log('completed button pressed log:', log);
								this.updateLogAsCompleted(log);
							}
						}
					]}
					right={[
						{
							text: 'Edit',
							backgroundColor: '#3f7cac',
							onPress: () => {
								console.log('edit button pressed log:', log);
								this.props.reduxSetActiveLog(log);
								this.toggleLogModal();
							}
						},
						{
							text: 'Delete',
							backgroundColor: '#c33149',
							onPress: () => {
								console.log('delete button pressed log:', log);
								this.deleteLog(log);
							}
						}
					]}
					key={Math.random()}
				>
					<View style={styles.logItem}>
						<Text>Title: {log.title}</Text>
						<Text>Mileage: {log.mileage}</Text>
						{log.difficulty ? <Text>Difficulty: {log.difficulty}</Text> : null}
					</View>
				</Swipeout>
			);
		});
	};

	render() {
		if (this.props.selectedVehicle) {
			return (
				<View style={styles.logScreenContainer}>
					<Button onPress={() => this.toggleLogModal()} title="Add a New Log" color="#3e885b" />
					<UpdateMileageForm />
					<ScrollView style={styles.logContainer}>{this.renderLogs()}</ScrollView>
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
	},
	logContainer: {
		flex: 1
	},
	logScreenContainer: {
		flex: 1
	}
});

//update

const mapStateToProps = (state) => {
	return {
		vehicles: state.index.vehicles,
		userInfo: state.index.userInfo,
		selectedVehicle: state.index.selectedVehicle,
		activeLog: state.index.activeLog
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reduxSetActiveLog: (activeLog) => dispatch(setActiveLog(activeLog)),
		reduxSelectVehicle: (vehicle) => dispatch(selectVehicle(vehicle)),
		reduxSetVehicles: (vehicles) => dispatch(setVehicles(vehicles))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LogsScreen);
