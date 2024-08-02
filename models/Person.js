import { Schema, model } from 'mongoose'

const peSchema= new Schema({
    username: { type: String },
    password: { type: String },
    image: {type: String},
},{timestamps: true})

const Person= model('Person', peSchema)
export default Person