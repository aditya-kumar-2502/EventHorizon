import { db } from './db';

export const createTables = () => {
    // db.execSync(`DELETE FROM Event`);
    // db.execSync(`DELETE FROM Task`);
    // db.execSync(`DROP TABLE IF EXISTS Event`);
    // db.execSync(`DROP TABLE IF EXISTS Task`);
    db.execSync(`CREATE TABLE IF NOT EXISTS Task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
        )`);
    db.execSync(`CREATE TABLE IF NOT EXISTS Event (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER NOT NULL,
        start_time DATETIME NOT NULL,
        end_time DATETIME NOT NULL,
        todo_description TEXT,
        completed_description TEXT,
        FOREIGN KEY (task_id) REFERENCES Task(id)
    )`);
};
