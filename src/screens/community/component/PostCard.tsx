import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import tw from '@utils/tailwind';
import {MyIcon} from '@components/icon/MyIcon';
import {Post} from '@typesR/post';
import {MyText} from '@components/textview/MyText';
import ImageCarousel from './ImageCarousel';

interface PostCardProps {
  post: Post;
  onLikePress: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({post, onLikePress}) => {
  const currentUserId = post.currentUserId;
  const isLiked = post.likes?.includes(currentUserId || '');
  console.log('postUrl', post.imageUrls);
  return (
    <View style={tw.style('bg-white rounded-2xl p-3 pr-0 mb-4')}>
      {/* Header */}
      <View style={tw.style('flex-row items-center justify-between mb-3')}>
        <View style={tw.style('flex-row items-center')}>
          <Image
            source={{uri: post.author.avatar}}
            style={tw.style(
              'w-10 h-10 rounded-full border-2 border-yellow-400',
            )}
          />
          <View style={tw.style('ml-2')}>
            <MyText style={tw.style('font-bold')}>{post.author.name}</MyText>
            <MyText style={tw.style('text-gray-500 text-sm')}>
              {moment(post.createdAt.toDate()).fromNow()}
            </MyText>
          </View>
        </View>
        <MyIcon
          name="dots-three-vertical"
          iconFontType="Entypo"
          size={18}
          color="white"
        />
      </View>
      <View style={tw.style('flex-row')}>
        {/* Image */}
        <ImageCarousel
          images={post.imageUrls}
          postId={post.id}
          likes={post.likes || []}
        />

        {/* Side Buttons */}
        <View
          style={tw.style(
            'items-center self-end mb-6 bg-slate-200 py-3 px-2 rounded-md',
          )}>
          <TouchableOpacity
            onPress={() => onLikePress(post)}
            activeOpacity={0.7}
            style={tw.style('mb-4')}>
            <MyIcon
              name="fire"
              iconFontType="SimpleLineIcons"
              size={26}
              color={isLiked ? 'red' : 'black'}
            />
            <MyText style={tw.style(' text-base text-center mt-1')}>
              {post.likes?.length || 0}
            </MyText>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
            <MyIcon
              name="share"
              iconFontType="Octicons"
              size={26}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Caption */}
      <MyText style={tw.style('text-sm mb-1')}>{post.caption}</MyText>
    </View>
  );
};

export default PostCard;
