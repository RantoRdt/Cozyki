import mongoose from 'mongoose'
const { connect, connection } = mongoose

const connectDb = url => connect(url, { useNewUrlParser: true })
connection.on('error', err => console.log('Connexion avec la base de données échouée', err))
connection.once('open', () => console.log('Connexion avec la base de données établie'))

export default connectDb