import { Request, Response } from 'express';
import userService from './user.service';

class UserController {
    async create(req: Request, res: Response) {
        try {
            const user = await userService.create(req.body);
            res.status(200).json(user);
        } catch (e:any) {
            res.status(500).json({ message: e.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await userService.getAll();
            return res.json(users);
        } catch (e:any) {
            res.status(500).json({ message: e.message });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.getOne(Number(id));
            return res.json(user);
        } catch (e:any) {
            res.status(500).json({ message: e.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = req.body;
            const updatedUser = await userService.update(user, Number(id));
            res.status(200).json(updatedUser);
        } catch (e:any) {
            res.status(500).json({ message: e.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.delete(Number(id));
            return res.json(user);
        } catch (e:any) {
            res.status(500).json({ message: e.message });
        }
    }
}

export default new UserController();
