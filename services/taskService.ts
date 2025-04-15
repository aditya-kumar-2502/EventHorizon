import { SQLiteRunResult } from 'expo-sqlite';
import { db } from '../db/db';

export type Task = {
    id: number;
    name: string;
};

export const addTask = (name: string): Promise<SQLiteRunResult> => {
    return db.runAsync(
        `INSERT INTO Task (name) VALUES (?)`,
        [name]
    );
};


export const getAllTasks = (): Promise<Task[]> => {
    return db.getAllAsync(
        `SELECT * FROM Task`
    ) as Promise<Task[]>;
  };