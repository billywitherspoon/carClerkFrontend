import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainContainer from '../containers/MainContainer';

export default class LogsScreen extends React.Component {
	render() {
		return (
			<View style={styles.flexCenter}>
				<MainContainer activeContainer={'Logs'} />
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

// import React from 'react';
// import { ExpoConfigView } from '@expo/samples';

// export default class LogsScreen extends React.Component {
// 	static navigationOptions = {
// 		title: 'app.json'
// 	};

// 	render() {
// 		/* Go ahead and delete ExpoConfigView and replace it with your
//      * content, we just wanted to give you a quick view of your config */
// 		return <ExpoConfigView />;
// 	}
// }
