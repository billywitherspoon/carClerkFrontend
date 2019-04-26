import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainContainer from '../containers/MainContainer';

export default class VehicleScreen extends React.Component {
	render() {
		return (
			<View style={styles.flexCenter}>
				<MainContainer activeContainer={'Vehicle'} />
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
// import { ScrollView, StyleSheet } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';

// export default class VehicleScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Links',
//   };

//   render() {
//     return (
//       <ScrollView style={styles.container}>
//         {/* Go ahead and delete ExpoLinksView and replace it with your
//            * content, we just wanted to provide you with some helpful links */}
//         <ExpoLinksView />
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });
