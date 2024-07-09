
const userService = require('../services/user.service');

class UserController {
    async create(req,res){
        try{
            const user = await userService.create(req.body)
            res.status(200).json(user);
        }
        catch(e){
            res.status(500).json({message: e.message});
        }
    }
    async getAll(req, res){
        try{
            const users = await userService.getAll();
            return res.json(users);
        }
        catch(e){
            res.status(500).json({message: e.message});
        }
    }
    async getOne(req, res){
        try{
            const {id} = req.params;
            const user = await userService.getOne(id);
            return res.json(user);
        }
        catch(e){
            res.status(500).json({message: e.message});
        }
    }
    async update(req, res){
        try{
            const {id} =req.params;
            const user = req.body;
            const Upuser = await userService.update(user,id);
            res.status(200).json(Upuser);
        }
        catch(e){
            res.status(500).json({message: e.message});
        }
    }
    async delete(req, res){
        try{
            const {id} =req.params;
            const user = await userService.delete(id);
            return res.json(user);
        }
        catch(e){
            res.status(500).json({message: e.message});
        }
    }
}

module.exports = new UserController();