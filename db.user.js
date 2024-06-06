const db = require('./db');

// Создание таблицы, если она еще не создана
db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL
    )
`).catch(err => console.error('Error creating table:', err));

module.exports = {
    async getUsers() {
        try {
            const { rows } = await db.query('SELECT * FROM users');
            return rows;
        } catch (err) {
            return err;
        }
    },

    async getUserById(id) {
        try {
            const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
            return rows[0];
        } catch (err) {
            return err;
        }
    },

    async createUser(user) {
        try {
            const { name, age } = user;
            const { rows } = await db.query(
                'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *',
                [name, age]
            );
            return rows[0];
        } catch (err) {
            return err;
        }
    },

    async updateUser(id, user) {
        try {
            const fields = [];
            const values = [];
            let query = 'UPDATE users SET ';
            let count = 1;
            //формируем строку для ключ-значение 
            for (const [key, value] of Object.entries(user)) {
                fields.push(`${key} = $${count}`);
                values.push(value);
                count++;
            }
            values.push(id);

            query += fields.join(', ') + ` WHERE id = $${count} RETURNING *`;
            const { rows } = await db.query(query, values);

            return rows[0];
        } catch (err) {
            return err;
        }
    },

    async deleteUser(id) {
        try {
            const { rowCount } = await db.query('DELETE FROM users WHERE id = $1', [id]);
            return rowCount > 0;
        } catch (err) {
            return err;
        }
    }
};
