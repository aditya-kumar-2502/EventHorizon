import React, { useEffect } from 'react';
import { View, StyleSheet, Button, Alert, Text, TouchableOpacity } from "react-native";
import { Task } from '../../src/model/task'; 
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getTask } from '../../src/services/taskService';
import { getAllEvents } from '@/src/services/eventService';
import EventCard from '../component/event';

const ViewTask = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const task:Task = getTask(Number(id));

  const events = getAllEvents().filter(event => event.taskId === Number(id));

  return (
    <View>
      <Text>Name: {task.name}</Text>
      <Text>Description: {task.description}</Text>
      <Text>Status: {task.status}</Text>

      {events.map((event) => (
        <View key={event.id} style={{ marginBottom: 10 }}>
          <EventCard event={event} />
        </View>
      ))}

      

      <TouchableOpacity
              onPress={() => router.push(`/event/create/${id}`)} 
              style={{
                backgroundColor: '#007bff',
                padding: 10,
                borderRadius: 5,
                marginTop: 5,
              }}
            >
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 20 }}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  input: {
    backgroundColor: "white",
  },
});

export default ViewTask;
