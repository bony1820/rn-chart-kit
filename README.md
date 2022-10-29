# rn-chart-kit
rn-chart-kit
## Installation

```sh
npm install rn-chart-kit
```

## Usage

```js
import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { QuadrantChart, ProgressArc } from 'rn-chart-kit';

export default function App() {
  return (
    <View style={styles.container}>
      <QuadrantChart />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
