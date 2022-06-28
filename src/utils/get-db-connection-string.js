module.exports = () => {
    let databaseConnectionString
    if (process.env.DB_USER && process.env.DB_PASSWORD) {
        return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.omvek.mongodb.net/test`
    } else {
        return `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    }
}