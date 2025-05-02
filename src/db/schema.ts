import { db } from './db';

export const createTables = () => {
    // db.execSync(`DROP TABLE IF EXISTS task`);
    // db.execSync(`DROP TABLE IF EXISTS events`);
    db.execSync(`CREATE TABLE IF NOT EXISTS task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL
    )`);
    db.execSync(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        taskId INTEGER NOT NULL,
        startTime TEXT NOT NULL,
        endTime TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE
    );`);
};
