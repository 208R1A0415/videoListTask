import { VideoListScreenNavigationProp } from './navigation';

export type Props = {
  navigation: VideoListScreenNavigationProp;
};

export type VideoItem = {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
};
