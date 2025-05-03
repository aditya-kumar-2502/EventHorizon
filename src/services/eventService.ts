import { SQLiteRunResult } from 'expo-sqlite';
import { db } from '../db/db';

import type { Event } from '../model/event';


export const createEvent = (taskId: number, startTime: string, endTime: string, description: string): SQLiteRunResult => {
    return db.runSync(
        `INSERT INTO event (taskId, startTime, endTime, description) VALUES (?, ?, ?, ?)`,
        [taskId, startTime, endTime, description]
    );
};

export const getAllEvents = (): Event[] => {
    return db.getAllSync(
        `SELECT * FROM event`
    ) as Event[];
};

export const getEvent = (id: number): Event => {
    return db.getFirstSync(
        `SELECT * FROM event WHERE id = ?`,
        [id]
    ) as Event;
};