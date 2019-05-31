import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import UpdateMileageForm from '../components/UpdateMileageForm';
import LogModal from '../modals/LogModal';
import Swipeout from 'react-native-swipeout';
import { setActiveLog, setVehicles, selectVehicle } from '../store/actions/index.js';
import { vw, vh } from 'react-native-expo-viewport-units';

class LogsScreen extends React.Component {
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

	//uses redux to update the log as completed in the selected vehicle and the all vehicles array
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

	//uses redux to delete the log in the selected vehicle and the all vehicles array
	deleteLog = (log) => {
		console.log('deleting log:', log);
		let updatedVehicle = { ...this.props.selectedVehicle };
		updatedVehicle.logs = updatedVehicle.logs.filter((l) => {
			return l != log;
		});
		this.updateVehicleStates(updatedVehicle);
		this.deleteLogFetch(log);
	};

	//deletes the log in the backend
	deleteLogFetch = (log) => {
		fetch(`http://10.0.1.12:5513/api/v1/logs/${log.id}`, {
			method: 'DELETE'
		});
	};

	//updates the log in the backend
	updateLogFetch = (logCopy) => {
		fetch(`http://10.0.1.12:5513/api/v1/logs/${logCopy.id}`, {
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

	//takes an updatedVehicle from the backend, updates the state of the selected vehicle and the all vehicles array
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

	//returns the difficulty for a log if it exists
	renderDifficulty = (log) => {
		if (log.difficulty) {
			return (
				<View style={styles.flexColumnCenter}>
					<Text style={styles.title}>Difficulty</Text>
					<Text style={styles.logBody}>{log.difficulty}</Text>
				</View>
			);
		} else {
			return null;
		}
	};

	//renders a checkmark if the log is completed
	renderCheckMark = (log) => {
		if (log.complete) {
			return <Text style={styles.logBody}>✓</Text>;
		} else {
			return <Text style={styles.logBodyInvisible}>✓</Text>;
		}
	};

	//takes in an argument of what to display on a swipe button, returns buttom
	renderSwipeButtonText = (text) => {
		<View style={styles.swipeButton}>
			<Text style={styles.buttonText}>{text}</Text>
		</View>;
	};

	renderLogs = () => {
		vehicleLogs = this.props.selectedVehicle.logs.map((log) => log);
		console.log(vehicleLogs);
		vehicleLogs.sort((a, b) => (a.mileage > b.mileage ? 1 : -1));
		return vehicleLogs.map((log) => {
			return (
				<Swipeout
					autoClose={true}
					style={styles.swipeout}
					left={[
						{
							backgroundColor: '#51a503',
							component: (
								<View style={styles.swipeButton}>
									<Text style={styles.buttonText}>Mark Complete</Text>
								</View>
							),
							onPress: () => {
								console.log('completed button pressed log:', log);
								this.updateLogAsCompleted(log);
							}
						}
					]}
					right={[
						{
							backgroundColor: '#d89d06',
							component: (
								<View style={styles.swipeButton}>
									<Text style={styles.buttonText}>Edit</Text>
								</View>
							),
							onPress: () => {
								console.log('edit button pressed log:', log);
								this.props.reduxSetActiveLog(log);
								this.toggleLogModal();
							}
						},
						{
							backgroundColor: '#d00000',
							component: (
								<View style={styles.swipeButton}>
									<Text style={styles.buttonText}>Delete</Text>
								</View>
							),
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
							{this.renderDifficulty(log)}
							<View style={styles.flexColumnCenter}>
								<Text style={styles.title}>Completed</Text>
								{this.renderCheckMark(log)}
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
					<TouchableOpacity style={styles.addLogTouchable} onPress={() => this.toggleLogModal()}>
						<Text style={styles.addLogText}>Add a Log</Text>
					</TouchableOpacity>
					<ScrollView
						contentContainerStyle={{
							width: vw(100)
						}}
					>
						<UpdateMileageForm />
						{this.renderLogs()}
					</ScrollView>
					<LogModal display={this.state.displayLogModal} toggleLogModal={this.toggleLogModal} />
				</View>
			);
		} else {
			return (
				<View style={styles.logScreenContainer}>
					<Text style={styles.bodyText}>Please add a vehicle</Text>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	swipeout: {
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: 'transparent'
	},
	logItem: {
		backgroundColor: '#1c3144',
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		alignContent: 'center',
		padding: 10
	},
	logScreenContainer: {
		flex: 1,
		backgroundColor: '#e5e8ec',
		flexDirection: 'column',
		alignItems: 'center'
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
	swipeButton: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	addLogTouchable: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#1c3144',
		borderWidth: 1.5,
		paddingTop: 5,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 5,
		marginRight: vw(20),
		marginLeft: vw(20),
		marginTop: 20,
		marginBottom: 20,
		borderRadius: 30,
		backgroundColor: '#e5e8ec',
		alignContent: 'center'
	},
	addLogText: {
		fontSize: vh(2.5),
		color: '#1c3144',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	logTitle: {
		fontSize: vh(2.5),
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#e5e8ec',
		marginBottom: 10
	},
	title: {
		color: '#e5e8ec',
		fontSize: vh(2),
		fontWeight: 'bold'
	},
	logBody: {
		fontSize: vh(2),
		textAlign: 'left',
		color: '#e5e8ec'
	},
	logBodyInvisible: {
		fontSize: vh(2),
		textAlign: 'left',
		color: '#1c3144'
	},
	bodyText: {
		fontSize: vh(2.5),
		color: '#1c3144'
	},
	buttonText: {
		fontSize: vh(2),
		color: '#e5e8ec',
		fontWeight: 'bold',
		textAlign: 'center'
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
