import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { Task } from '../../../src/model/task'; 
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getTask } from '../../../src/services/taskService';
import { createEvent } from '@/src/services/eventService';

const CreateEventScreen = () => {
  const router = useRouter();
  const { taskId } = useLocalSearchParams();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateEvent = () => {
    if (!startTime || !endTime || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setStartTime('');
    setEndTime('');
    setDescription('');

    createEvent(
      Number(taskId),
      startTime,
      endTime,
      description
    );
    

    setIsLoading(false);

    Alert.alert('Success', 'Event created successfully');
    router.push(`/task/${taskId}`);
  };

  const task:Task = getTask(Number(taskId));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Id: {taskId}</Text>
      <Text style={styles.label}>Name: {task.name}</Text>
      <Text style={styles.label}>Description: {task.description}</Text>

      <Text style={styles.label}>Enter event details:</Text>

      <Text style={styles.label}>Start Time</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 09:00"
        value={startTime}
        onChangeText={setStartTime}
      />

      <Text style={styles.label}>End Time</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 17:00"
        value={endTime}
        onChangeText={setEndTime}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Button disabled={isLoading} title="Submit Event" onPress={handleCreateEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default CreateEventScreen;
