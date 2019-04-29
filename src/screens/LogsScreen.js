import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { setUserInfo, setVehicles, addNewVehicle } from '../store/actions/index.js';

class LogsScreen extends React.Component {
	render() {
		return (
			<View style={styles.flexCenter}>
				<Text>Logs Screen</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flexCenter: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
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
		reduxSetVehicles: (vehicles) => dispatch(setVehicles(vehicles))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LogsScreen);
