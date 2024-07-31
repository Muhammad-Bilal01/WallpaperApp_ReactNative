import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';

function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);

  return (
    <View style={style.container}>
      <Animatable.Image
        animation="slideInDown"
        source={require('../assets/logo.png')}
        style={style.logo}
      />
      <Animatable.Text animation="slideInDown" style={style.appName}>
        Recipe Pro
      </Animatable.Text>
      <Animatable.Text animation="slideInUp" style={style.version}>
        version: 1.0.0
      </Animatable.Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05b681',
  },
  logo: {
    width: 200,
    height: 200,
  },
  appName: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
  },
  version: {
    fontWeight: 300,
    color: 'white',
    position: 'absolute',
    bottom: 30,
  },
});

export default Splash;
