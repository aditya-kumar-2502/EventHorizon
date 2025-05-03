import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getAllTasks } from '../../src/services/taskService';
import { Task } from '../../src/model/task';
import { useFocusEffect } from '@react-navigation/native';

export default function SelectTaskScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const router = useRouter();
    const fetchTasks = () => {
      const allTasks =  getAllTasks();
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
          Tasks
        </Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity style={{
                  backgroundColor: '#007bff',
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 20,
                }} 
                onPress={() => router.push(`/event/create/${item.id}`)}>
                  <Text style={{ color: 'white', textAlign: 'center' }} >{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
}
