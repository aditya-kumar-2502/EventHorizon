import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Event } from '../../src/model/event'; // Adjust the import path as necessary

type EventCardProps = {
    event: Event;
};
const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Event ID: {event.id}</Text>
        <Text style={styles.text}>Start Time: {event.startTime}</Text>
        <Text style={styles.text}>End Time: {event.endTime}</Text>
        <Text style={styles.text}>Description: {event.description}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      padding: 16,
      margin: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 6,
    },
    text: {
      fontSize: 14,
      marginBottom: 2,
    },
  });
  
  export default EventCard;