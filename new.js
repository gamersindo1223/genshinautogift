require('dotenv').config()
const Genshin_Data = process.env.login_data
const repo_owner = process.env.repo_cred.split('/')[0]
const repo_name = process.env.repo_cred.split('/')[1]
const redeemed_code = require('./data/redeemed.json')
const korefile = require('korefile')
const axios = require('axios')