const db = require('../modele');

module.exports = {
    async create(user){
        const created = await db.create(user);
        return created;
    },
    async getAll(){
            const users = await db.findAll();
            return users;
    },
    async getOne(id){
            if(!id){
                throw new Error("id не указан");
            }
            const user = await db.findByPk(id);
            return user;
    },
    async update(user,id){
        if(!id){
            throw new Error("id не указан");
        }
        await db.update(user,{where:{id:id}});
        const Upuser = await db.findByPk(id);
        return Upuser;
    },
    async delete(id){
        if(!id){
            throw new Error("id не указан");
        }
        const user = await db.destroy({where:{id:id}});
        return user;
    }
};
