import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  LogBox,
} from 'react-native';

import { createThumbnail } from 'react-native-create-thumbnail';
import { Props, VideoItem } from './types/VideoList';



const initialVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Nature Stream',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    id: '2',
    title: 'Piano Session',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: '3',
    title: 'Wildlife Documentary',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: '4',
    title: 'City Timelapse',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
];
export const VideoListScreen=({ navigation }: Props)=> {
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);

  useEffect(() => {
    const generateThumbnails = async () => {
      try {
        const updatedVideos = await Promise.all(
          videos.map(async (video) => {
            const response = await createThumbnail({
              url: video.url,
              timeStamp: 5000, 
            });
            const uri =
              Platform.OS === 'android'
                ? `file://${response.path}`
                : response.path;
            return { ...video, thumbnail: uri };
          })
        );
        setVideos(updatedVideos);
      } catch (error) {
        console.log('Thumbnail generation error:', error);
      }
    };
    generateThumbnails();
  }, []);
  const renderItem = ({ item }: { item: VideoItem }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() =>
        navigation.navigate('VideoPlayer', {
          videoUrl: item.url,
          title: item.title,
        })
      }
    >
      <Text style={styles.videoTitle}>{item.title}</Text>
      {item.thumbnail ? (
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.thumbnail,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Text>Loading thumbnail...</Text>
        </View>
      )}
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  videoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    padding: 10,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#001f5b', 
    marginBottom: 10,
    textAlign: 'left',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
});
