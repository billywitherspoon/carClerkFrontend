import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
// import { setVehicles, selectVehicle } from '../store/actions/index.js';
import UpdateMileageForm from '../components/UpdateMileageForm';

class LogsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.flexCenter}>
				<Text>Logs Screen</Text>
				{this.props.selectedVehicle ? <UpdateMileageForm /> : null}
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
// 		reduxSetVehicles: (vehicles) => dispatch(setVehicles(vehicles)),
// 		reduxSelectVehicle: (selectedVehicle) => dispatch(selectVehicle(selectedVehicle))
// 	};
// };

export default connect(mapStateToProps)(LogsScreen);
