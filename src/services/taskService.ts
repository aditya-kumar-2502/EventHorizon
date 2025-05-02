import { SQLiteRunResult } from 'expo-sqlite';
import { db } from '../db/db';

import type { Task } from '../model/task';

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