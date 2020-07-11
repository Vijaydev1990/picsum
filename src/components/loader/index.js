import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

var styles = StyleSheet.create({
  wrapper: {
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    width: '90%',
  },
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 250,
    width: 300,
    marginTop: 20,
    marginBottom: 20,
  },
  circle: {width: 60, height: 60, borderRadius: 50},
  line75: {
    height: 250,
    width: 300,
    borderRadius: 4,
  },
  line50: {marginTop: 6, width: 150, height: 20, borderRadius: 4},
});
function Loader() {
  return (
    <SkeletonPlaceholder>
      <View style={styles.wrapper}>
        {[1, 2, 3, 4, 5].map((i) => {
          return (
            <View style={styles.listWrapper}>
              <View style={{marginLeft: 20}}>
                <View style={styles.line75} />
              </View>
            </View>
          );
        })}
      </View>
    </SkeletonPlaceholder>
  );
}
export default Loader;
