import {ScrollView, View} from 'react-native';
import React from 'react';
import SwipeableStartRun from './components/SwipeableStartRun';
import {MyText} from '@components/textview/MyText';
import tw from '@utils/tailwind';

export default function Run() {
  return (
    <View style={tw.style('flex-1 bg-slate-200')}>
      <ScrollView contentContainerStyle={tw.style('flex-1')}>
        <View style={tw.style('flex-1 ')}>
          <MyText>Tien Long</MyText>
        </View>
      </ScrollView>
      <SwipeableStartRun
        label="Slide to start run"
        icon="play"
        onSlideComplete={() => {
          console.log('Run started!');
          // Gọi API, bật tracking GPS, v.v.
        }}
      />
    </View>
  );
}
