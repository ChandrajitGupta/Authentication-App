import fs from 'fs'

let content = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
let users = content.data

const update = () => {
    fs.writeFileSync('./data.json', JSON.stringify({ name: 'users', data: users }, null, 4), 'utf-8')
}

export const getUser = (id) => {
    return users.find(user => user.id === id)
}

export const loginUser = (name, password) => {
    const user = users.find(user => user.name === name && user.password === password)
    return { id: user.id, name: user.name }
}

export const addUser = (user) => {
    user.id = users.length ? users[users.length - 1].id + 1 : 1
    users.push(user)
    update()
    return { id: user.id, name: user.name }
}

export const updateUser = (id, updatedUser) => {
    users = users.map(user => user.id === id ? { ...user, ...updatedUser } : user)
    update()
    return { id: id, name: getUser(id)?.name }
}

export const deleteUser = (id) => {
    users = users.filter(user => user.id !== id)
    update()
    return { id: id, name: getUser(id)?.name }
}