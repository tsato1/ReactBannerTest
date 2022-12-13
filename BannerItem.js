import React from 'react';

import {View, Image, StyleSheet, Dimensions, Appearance} from 'react-native';

export default BannerItem = ({item}) => {
  const width = Dimensions.get('window').width - 32; // each horizontal margin is 16

  const isDarkMode = Appearance.getColorScheme() === 'dark';

  return (
    <View style={{width}}>
      <Image source={{uri: item.imageUrl}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    borderRadius: 5,
  },
});
