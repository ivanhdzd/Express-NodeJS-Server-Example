import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { existsSync, readdirSync, unlinkSync } from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import { join } from 'path';
import rfs from 'rotating-file-stream';

import routesV1 from './api/v1/routes';

// Validate that server is running in development environment
const devEnv = process.env.DEV_ENV === 'true';
// Logs directory
const logsDirectory = join(__dirname, '..', 'logs');
// Delete server logs in development environment
if (devEnv && existsSync(logsDirectory)) {
	const files = readdirSync(logsDirectory);
	files.forEach(file => unlinkSync(join(logsDirectory, file)));
}
// Create a rotating write stream
const accessLogStream = rfs('server.log', {
	interval: '1d', // Rotate daily
	path: logsDirectory
});
// Create an express instance
const app = express();
// Use body parser so we can get into from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Add cors
app.use(cors());
// Help secure Express apps by setting various HTTP headers
app.use(helmet());
// Use morgan to log requests to the console
app.use(morgan('combined', { stream: accessLogStream }));
// Show logs in console in development environment
if (devEnv) app.use(morgan('dev'));
// Add API v1 routes
app.use('/api/v1', routesV1);
// Public directory
const publicDirectory = join(__dirname, '..', 'public');
// Validate that public directory exists
if (existsSync(publicDirectory)) {
	// Set public directory as static
	app.use(express.static(publicDirectory));
	// Assuming that frontend is a SPA (Angular, React, VueJS, etc.), redirect all GET requests to it
	app.get('*', (req, res) => res.sendFile(join(publicDirectory, 'index.html')));
	// Whatever request method returns a 404 status
	app.use('*', (req, res) => res.sendStatus(404));
} else console.warn(`[WARNING]: 'public' directory doesn't exists, only API will be available.`);
// Server port
const port = process.env.PORT;
// Start server
app.listen(port, () => console.info(`Express server running on port: ${ port }.`));