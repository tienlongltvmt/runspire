import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface Author {
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  author: Author;
  caption: string;
  imageUrls: string[];
  createdAt: FirebaseFirestoreTypes.Timestamp;
  likes: string[];
  likedAvatars?: string[]; // danh sách avatar của người đã like
  likedByName?: string; // tên người like nổi bật
  currentUserId?: string; // truyền thủ công khi mapping
}
