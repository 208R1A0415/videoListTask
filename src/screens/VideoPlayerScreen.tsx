import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { Props } from './types/VideoPlayer';

export const  VideoPlayerScreen=({ route }: Props)=> {
 
  const { videoUrl } = route.params;

  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        controls
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (16 / 9),
  },
});
