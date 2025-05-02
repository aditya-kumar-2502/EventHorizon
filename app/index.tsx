import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getAllTasks, Task } from '../src/services/taskService';
import { useFocusEffect } from '@react-navigation/native';
import { createTables } from '@/src/db/schema';

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    createTables();
  }, []);

  const fetchTasks = async () => {
    const allTasks = await getAllTasks();
    setTasks(allTasks);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        EventHorizon Object of Power
      </Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => router.push('/add-task')} // Navigate to Add Task screen
        style={{
          backgroundColor: '#007bff',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}
