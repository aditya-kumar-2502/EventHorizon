import { SQLiteRunResult } from 'expo-sqlite';
import { db } from '../db/db';

import type { Task } from '../model/task';

export const addTask = (name: string, description: string, status: string): SQLiteRunResult => {
    return db.runSync(
        `INSERT INTO Task (name, description, status) VALUES (?, ?, ?)`,
        [name, description, status]
    );
};

export const getAllTasks = (): Task[] => {
    return db.getAllSync(
        `SELECT * FROM Task`
    ) as Task[];
};

export const getTask = (id: number): Task => {
    return db.getFirstSync(
        `SELECT * FROM Task WHERE id = ?`,
        [id]
    ) as Task;
};