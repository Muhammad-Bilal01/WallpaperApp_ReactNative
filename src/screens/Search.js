import React from 'react';
import {Text, useColorScheme, View} from 'react-native';

function Search() {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  return (
    <View
      style={[
        {flex: 1, justifyContent: 'center'},
        isDark ? {backgroundColor: 'black'} : {backgroundColor: white},
      ]}>
      <Text>Search</Text>
    </View>
  );
}

export default Search;
