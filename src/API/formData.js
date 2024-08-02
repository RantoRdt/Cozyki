export default content =>{
    const formData = new FormData()
    for (const key in content) if (content[key]) formData.append(key, content[key])
    return formData
}