import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { addTask } from '../services/taskService';

export default function AddTaskScreen() {
  const [taskName, setTaskName] = useState('');
  const router = useRouter();

  const handleAddTask = async () => {
    if (!taskName.trim()) {
      Alert.alert('Task name is required');
      return;
    }

    try {
      await addTask(taskName);
      setTaskName('');
      router.back(); // Navigate back to home screen
    } catch (error) {
      Alert.alert('Error adding task', String(error));
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Add a new task</Text>
      <TextInput
        placeholder="Task name"
        value={taskName}
        onChangeText={setTaskName}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
}
