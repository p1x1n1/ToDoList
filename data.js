//хранилище и текущий в нём элемент
let users = [];
let currentIndex = 1;

//взаимодействие с хранилищем
module.exports = {
    getUsers: () => users,
    getUserById: (id) => users.find(user => user.id === id),
    createUser: (user) => {
        user.id = currentIndex++;
        users.push(user);
    },
    updateUser: (id, user) => {
        const index = users.findIndex(user => user.id === id);
        if ( index !== -1 ){ 
            users[index] = {...users[index],...user};
            return users[index];
        }
        return null;
    },
    deleteUser: (id) => {
        const index = users.findIndex(user => user.id === id);
        if ( index!== -1 ){ 
            users.splice(index, 1);
            return true;
        }
        return false;
    }
}
