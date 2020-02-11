import React from 'react';
import {View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

export default function ProfileGraph({colors, counts = [], periods = []}) {
  const data = {
    labels: periods,
    datasets: [
      {
        data: counts,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    backgroundGradientFromOpacity: 0,
    color: () => colors[1],
    barPercentage: 0.6,
    decimalPlaces: 1,
  };

  if (counts.length === 0) {
    return <View />;
  }

  return (
    <View style={styles.statsContainer}>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = {
  statsContainer: {
    marginTop: 24,
    backgroundColor: '#fafafa',
    shadowColor: '#0c0c0c',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    flexDirection: 'row',
  },
};
