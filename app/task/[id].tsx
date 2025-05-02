import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Task } from '../../src/model/task'; 
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getTask } from '../../src/services/taskService';

const ViewTask = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const task:Task = getTask(Number(id));

  return (
    <View>
      <Text>Name: {task.name}</Text>
      <Text>Description: {task.description}</Text>
      <Text>Status: {task.status}</Text>
    </View>
  );
};

export default ViewTask;
