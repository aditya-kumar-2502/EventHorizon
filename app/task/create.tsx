import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { addTask } from '../../src/services/taskService';

export default function AddTaskScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleAddTask = () => {
    if (!name.trim()) {
      Alert.alert('Task name is required');
      return;
    }

    try {
      addTask(name, description, 'backlog');
      setName('');
      setDescription('');
      router.back(); // Navigate back to home screen
    } catch (error) {
      Alert.alert('Error adding task', String(error));
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Add a new task</Text>
      
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Enter task name" />

      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder="Enter description" />


      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
}
