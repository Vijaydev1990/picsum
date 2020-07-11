import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
var styles = StyleSheet.create({
  headerWrapper: {
    minHeight: 210,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#ddd',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    minHeight: 80,
    maxHeight: 200,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  MenuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '120%',
  },
  IconWrapper: {
    resizeMode: 'cover',
  },
});

function Header(props) {
  const {title} = props;

  function letMeOut() {
    AsyncStorage.removeItem('user');
    props.linkToLogin('Login');
  }
  return (
    <View>
      <StatusBar backgroundColor={'#ff4e62'} />
      <LinearGradient
        colors={['#ff4e62', '#974258']}
        style={styles.linearGradient}>
        <View style={styles.MenuRow}>
          <TouchableOpacity
            style={styles.IconWrapper}
            onPress={() => {
              props.openSideDrawer();
            }}></TouchableOpacity>
          <Text style={styles.buttonText}>{title}</Text>
          <TouchableOpacity
            style={styles.IconWrapper}
            onPress={() => {
              letMeOut();
            }}></TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

export default Header;
