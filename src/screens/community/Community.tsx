import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {MyIcon} from '@components/icon/MyIcon';
import NavigationService from '@navigation/NavigationService';
import tw from '@utils/tailwind';
import PostCard from './component/PostCard';
import {Post} from '@typesR/post';
const Community = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const snapshot = await firestore()
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get();

      const data: any[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(data);
    } catch (error) {
      console.log('Lỗi khi tải bài viết:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatedPostCommunity = () => {
    NavigationService.navigate('CreatedPostCommunity');
  };

  return (
    <SafeAreaView style={tw.style('flex-1 bg-slate-100')}>
      {loading ? (
        <View style={tw.style('flex-1 justify-center items-center')}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({item}: {item: Post}) => <PostCard post={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
          }
          contentContainerStyle={tw.style('p-4')}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={tw.style(
          'bg-blue-500 p-4 rounded-full absolute bottom-10 right-4',
        )}
        onPress={handleCreatedPostCommunity}>
        <MyIcon iconFontType="AntDesign" name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Community;
