const express = require('express')
const os = require('os')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3010

app.disable('x-powered-by');

app.set('trust proxy', 1);

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Content-Range', 'Content-Disposition', 'Content-Description'],
    maxAge: 1000,
  })
)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        status: 'Server running',
        server: {
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            osType: os.type(),
            osRelease: os.release(),
            uptime: `${Math.floor(os.uptime() / 3600)} hours ${Math.floor((os.uptime() % 3600) / 60)} minutes`
        },
        runtime: {
            nodeVersion: process.version,
            npmEnvironment: process.env.NODE_ENV || 'development',
            processId: process.pid,
            execPath: process.execPath
        },
        cpu: {
            model: os.cpus()[0]?.model || 'Unknown',
            cores: os.cpus().length,
            loadAverage: os.loadavg()
        },
        memory: {
            total: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`,
            free: `${(os.freemem() / 1024 ** 3).toFixed(2)} GB`,
            used: `${((os.totalmem() - os.freemem()) / 1024 ** 3).toFixed(2)} GB`
        }
    })
})

app.get('/api', (req, res) => {
    res.json({
        name: 'My Backend API',
        description: 'Backend service built with Node.js and Express',
        version: '1.0.0',
        status: 'API is working',
        timestamp: new Date().toISOString(),
        endpoints: {
            '/': {
                method: 'GET',
                description: 'Server status and system information'
            },
            '/api': {
                method: 'GET',
                description: 'API information and available endpoints'
            }
        },
    })
})

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`)
})