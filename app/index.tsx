import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('your-database-name.db');

type Task = {
  id: number;
  name: string;
};

const createTables = () => {
  db.execSync(`CREATE TABLE IF NOT EXISTS Task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )`);
  db.execSync(`CREATE TABLE IF NOT EXISTS Event (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        todo_description TEXT,
        completed_description TEXT,
        FOREIGN KEY (task_id) REFERENCES Task(id) ON DELETE CASCADE
      )`);
  db.execSync(`DELETE FROM Task`);
};

const addTask = (name: string) => {
  db.runSync(`INSERT INTO Task (name) VALUES (?)`, [name]);
};

const getTasks = (setTasks: any) => {
  const tasks: Task[] = db.getAllSync('SELECT * FROM Task') as Task[];
  setTasks(tasks);
};

export default function Index() {
  const [taskName, setTaskName] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    createTables();
    addTask('Task 1');
    getTasks(setTasks);
  }, []);

  const handleAddTask = (): void => {
    if (taskName.trim()) {
      addTask(taskName.trim());
      setTaskName('');
      getTasks(setTasks);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EventHorizon Object of Power</Text>
      <TextInput
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Enter task name"
        style={styles.input}
      />
      <Button title="Add Task" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.taskItem}>{item.name}</Text>}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
  taskItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});