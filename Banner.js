import React, {useState, useRef, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import BannerItem from './BannerItem';
import Paginator from './Paginator';

const BANNER_SCROLL_INTERVAL = 4000;

export default Banner = ({style, navigation, bannerItems}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(0);

  console.log('currentIndex=', currentIndex);
  const viewableItemsChanged = useRef(viewableItems => {
    // if (currentIndex === bannerItems.length - 1) {
    //   // going up
    //   bannerItems = [...bannerItems, ...bannerItems.slice(0, 1)].slice(
    //     -bannerItems.length,
    //   );
    //   // setBannerItemsState(_bannerItems);
    //   console.log('bannerItems=', bannerItems);
    // } else if (currentIndex === 0) {
    //   // going down
    //   bannerItems = [...bannerItems.slice(-1), ...bannerItems].slice(
    //     0,
    //     bannerItems.length,
    //   );
    //   // setBannerItemsState(_bannerItems);
    //   console.log('bannerItems=', bannerItems);
    // }

    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  useEffect(() => {
    const autoLoop = setInterval(() => {
      const nextIndex =
        currentIndex >= bannerItems.length - 1 ? 0 : currentIndex + 1;
      slidesRef.current.scrollToIndex({animated: true, index: nextIndex});
      setCurrentIndex(nextIndex);
    }, BANNER_SCROLL_INTERVAL);
    return () => clearInterval(autoLoop);
  });

  return (
    <View style={styles.container}>
      <View style={{height: 136}}>
        <FlatList
          data={bannerItems}
          renderItem={({item}) => <BannerItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item, index) => index}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged()}
          viewabilityConfig={viewConfig}
          initialScrollIndex={0}
          ref={slidesRef}
        />
      </View>
      <Paginator
        paddingTop={8}
        paddingBottom={12}
        paddingHorizontalSum={32}
        data={bannerItems}
        scrollX={scrollX}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    marginHorizontal: 16,
  },
});
