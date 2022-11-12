import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  // QuadrantChart,
  ProgressArc,
} from 'rn-chart-kit';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <QuadrantChart /> */}
      <ProgressArc
        percent1={90}
        percent2={70}
        size={200}
        gapGrid={5}
        strokeWidth={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
