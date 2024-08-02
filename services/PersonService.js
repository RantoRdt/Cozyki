import Person from "../models/Person.js"

const findByName = async username => { return await Person.findOne({ username }) }

const findById = async id => { return await Person.findById(id) }

const findAllButOne = async id =>{
    return await Person.find({ _id: { $ne: id } })
}

const handleUnicity = async username => {
    const user = await Person.findOne({ username })
    if (!user) return true
    return false
}

const createUser = async (username, password) => {
    const user = new Person({ username, password })
    await user.save()
    return user._id
}

export { findByName, handleUnicity, createUser, findById, findAllButOne }