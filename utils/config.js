require('dotenv').config();

// general
CONFIG = {}

CONFIG.env = process.env.NODE_ENV
CONFIG.port = process.env.PORT

// database
CONFIG.db = process.env.DB
CONFIG.db_test = process.env.DB_TEST
