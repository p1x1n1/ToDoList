import { PostgresDataSource } from './db';
import { User } from './modele';

const userRepository = PostgresDataSource.getRepository(User);

class UserService {
    async create(user: { name: string, age: number }) {
        try {
            const created = userRepository.create(user);
            await userRepository.save(created);
            return created;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Could not create user');
        }
    }

    async getAll() {
        try {
            return await userRepository.find();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Could not fetch users');
        }
    }

    async getOne(id: number) {
        try {
            const user = await userRepository.findOneBy({ id });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error(`Error fetching user with id ${id}:`, error);
            throw new Error('Could not fetch user');
        }
    }

    async update(user: { name: string, age: number }, id: number) {
        try {
            const existingUser = await userRepository.findOneBy({ id });
            if (!existingUser) {
                throw new Error('User not found');
            }
            await userRepository.update(id, user);
            return await userRepository.findOneBy({ id });
        } catch (error) {
            console.error(`Error updating user with id ${id}:`, error);
            throw new Error('Could not update user');
        }
    }

    async delete(id: number) {
        try {
            const user = await userRepository.findOneBy({ id });
            if (!user) {
                throw new Error('User not found');
            }
            await userRepository.remove(user);
            return user;
        } catch (error) {
            console.error(`Error deleting user with id ${id}:`, error);
            throw new Error('Could not delete user');
        }
    }
}

export default new UserService();
