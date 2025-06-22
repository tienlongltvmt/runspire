import React, {useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  View,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {getAuth} from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyIcon} from '@components/icon/MyIcon';
import {MyText} from '@components/textview/MyText';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import tw from '@utils/tailwind';

const CreatedPostCommunity = () => {
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handlePost = async () => {
    let urls: string[] = [];
    if (images.length > 0) {
      urls = await Promise.all(images.map(img => uploadToCloudinary(img)));
    }
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || !caption || !urls.length) {
      return Alert.alert('Vui lòng điền đủ nội dung và hình ảnh');
    }

    const newPost = {
      caption,
      imageUrls: urls,
      userId: user.uid,
      author: {
        name: user.displayName || 'Ẩn danh',
        avatar: user.photoURL || 'https://i.pravatar.cc/150?img=1',
      },
      createdAt: firestore.FieldValue.serverTimestamp(),
      likes: [],
    };

    try {
      await firestore().collection('posts').add(newPost);
      setCaption('');
      setImages([]);
      Alert.alert('Đăng bài thành công');
      //   navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Không thể đăng bài');
    }
  };

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
      selectionLimit: 5, // Giới hạn chọn 5 ảnh
    });
    if (result.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (result.assets && result.assets.length > 0) {
      const selectedImages: any = result.assets;
      setImages(selectedImages);
      console.log('Selected images:', selectedImages);
      // Upload the first image to Cloudinary
    }
  };
  const uploadToCloudinary = async (file: any) => {
    const data = new FormData();
    data.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName || 'media',
    });
    data.append('upload_preset', 'runpire'); // Tạo trong dashboard
    data.append('cloud_name', 'djbt2brqv');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/djbt2brqv/auto/upload',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return res.data.secure_url; // Đây là link bạn sẽ dùng
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  return (
    <SafeAreaView style={tw.style('flex-1 bg-white px-4')}>
      <ScrollView
        style={tw.style('flex-1')}
        showsVerticalScrollIndicator={false}>
        {/* Caption */}
        <MyText style={tw.style('mb-1')}>Caption:</MyText>
        <TextInput
          placeholder="Caption..."
          value={caption}
          onChangeText={setCaption}
          multiline
          maxLength={500}
          numberOfLines={4}
          placeholderTextColor="#999"
          style={tw.style(
            'border border-gray-300 p-3 rounded-2xl mb-4 h-32 text-black',
          )}
        />
        {/* Images */}
        <MyText style={tw.style('mb-1')}>Images:</MyText>
        <TouchableOpacity
          onPress={handlePickImage}
          activeOpacity={0.7}
          style={tw.style(
            'border border-gray-200 h-32 rounded-2xl mb-4 flex-row items-center justify-center',
          )}>
          <View
            style={tw.style(
              'items-center justify-center rounded-full border p-2',
            )}>
            <MyIcon
              iconFontType="Feather"
              name="upload"
              size={16}
              color={'black'}
            />
          </View>
        </TouchableOpacity>
        {images.length > 0 && (
          <View style={tw.style('flex-row flex-wrap mb-20')}>
            {images.map((image, index) => (
              <Image
                key={index}
                source={{uri: image?.uri}}
                style={tw.style(
                  'w-1/6 h-10 m-1 rounded-lg',
                  images.length > 2 ? 'h-24' : 'h-32',
                )}
              />
            ))}
          </View>
        )}
      </ScrollView>
      {/* Đăng bài */}
      <TouchableOpacity
        onPress={handlePost}
        style={tw.style('bg-blue-500 py-3 rounded-lg')}>
        <MyText style={tw.style('text-white text-center font-bold text-lg')}>
          Đăng bài
        </MyText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreatedPostCommunity;
