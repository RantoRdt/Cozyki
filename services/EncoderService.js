import bcrypt from "bcrypt"

const encodePassword = async password =>{
    const saltRounds = 10
    return new Promise((resolve, reject) =>{
        bcrypt.hash(password, saltRounds, (err, encodedPassword)=>
            (err) ? reject(err) : resolve(encodedPassword)
        )
    })
}

const verifyPassword = (p, p_hashed) => {
    return new Promise((resolve, reject) =>{
        bcrypt.compare(p, p_hashed, (err, corresp) =>{
            (err) ? reject(err) : resolve(corresp)
        })
    })
}

export { encodePassword, verifyPassword }