import React from 'react';
import {
  AccomodationScreen,
  ActivitiesScreen,
  AgendaScreen,
  DelegateInfoScreen,
  DelegatesScreen,
  EinvitesScreen,
  FeedbackScreen,
  GalleryScreen,
  HelpScreen,
  LeadersScreen,
  MinutesHRSummitScreen,
  NotificationsScreen,
  PlaceScreen,
  SpeakersScreen,
} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from './TabStack';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Home" component={TabStack} />
      <Stack.Screen name="Agenda" component={AgendaScreen} />
      <Stack.Screen name="Place" component={PlaceScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Einvites" component={EinvitesScreen} />
      <Stack.Screen name="Speakers" component={SpeakersScreen} />
      <Stack.Screen name="Leaders" component={LeadersScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="Delegates" component={DelegatesScreen} />
      <Stack.Screen name="Delegate Info" component={DelegateInfoScreen} />
      <Stack.Screen name="Accomodation" component={AccomodationScreen} />
      <Stack.Screen
        name="Minutes HR Summit"
        component={MinutesHRSummitScreen}
      />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Activities" component={ActivitiesScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
