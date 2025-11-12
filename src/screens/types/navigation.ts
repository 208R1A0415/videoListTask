import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// ✅ Define once
export type RootStackParamList = {
  VideoList: undefined;
  VideoPlayer: { title?: string; url?: string };
};

export type VideoListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VideoList'
>;


export type VideoPlayerScreenRouteProp = RouteProp<
  RootStackParamList,
  'VideoPlayer'
>;
