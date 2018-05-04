require('dotenv').config();

CONFIG = {}

CONFIG.env = process.env.NODE_ENV
CONFIG.port = process.env.PORT

CONFIG.db = process.env.DB
CONFIG.db_test = process.env.DB_TEST