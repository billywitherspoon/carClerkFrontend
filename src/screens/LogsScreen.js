import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
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
					style={styles.swipeout}
					left={[
						{
							text: 'Completed',
							backgroundColor: '#35605A',
							onPress: () => {
								console.log('completed button pressed log:', log);
								this.updateLogAsCompleted(log);
							}
						}
					]}
					right={[
						{
							text: 'Edit',
							backgroundColor: '#4C5760',
							onPress: () => {
								console.log('edit button pressed log:', log);
								this.props.reduxSetActiveLog(log);
								this.toggleLogModal();
							}
						},
						{
							text: 'Delete',
							backgroundColor: '#c14953',
							onPress: () => {
								console.log('delete button pressed log:', log);
								this.deleteLog(log);
							}
						}
					]}
					key={Math.random()}
				>
					<View style={styles.logItem}>
						<Text style={styles.logTitle}>{log.title}</Text>
						<View style={styles.detailsContainer}>
							<View style={styles.flexColumnCenter}>
								<Text style={styles.title}>Mileage</Text>
								<Text style={styles.logBody}>{log.mileage}</Text>
							</View>
							<View style={styles.flexColumnCenter}>
								{log.difficulty ? <Text style={styles.title}>Difficulty</Text> : null}
								{log.difficulty ? <Text style={styles.logBody}>{log.difficulty}</Text> : null}
							</View>
						</View>
					</View>
				</Swipeout>
			);
		});
	};

	render() {
		if (this.props.selectedVehicle) {
			return (
				<View style={styles.logScreenContainer}>
					<UpdateMileageForm />
					<TouchableOpacity style={styles.addLogTouchable} onPress={() => this.toggleLogModal()}>
						<Text style={styles.addLogTouchableText}>Add a Log</Text>
					</TouchableOpacity>
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
	swipeout: {
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: 'transparent'
	},
	logItem: {
		backgroundColor: '#93a8ac',
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		alignContent: 'center',
		padding: 10
	},
	logContainer: {
		flex: 1
	},
	logScreenContainer: {
		flex: 1
	},
	detailsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	flexColumnCenter: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	addLogTouchable: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#C9CACA',
		borderWidth: 1,
		paddingTop: 5,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 5,
		marginRight: vw(20),
		marginLeft: vw(20),
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 30,
		backgroundColor: '#93a8ac',
		alignContent: 'center'
	},
	addLogTouchableText: {
		fontSize: vh(2.5),
		color: '#4c5760',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	title: {
		color: '#4c5760',
		fontSize: vh(2),
		fontWeight: 'bold'
	},
	logTitle: {
		fontSize: vh(2.5),
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#4c5760',
		marginBottom: 10
	},
	logBody: {
		fontSize: vh(2),
		textAlign: 'left',
		color: '#4c5760'
	}
});

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
