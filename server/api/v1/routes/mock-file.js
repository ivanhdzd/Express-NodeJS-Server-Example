import { Router } from 'express';
import { get } from 'https';

const router = Router();
const url = 'https://raw.githubusercontent.com/ivanhdzd/Express-NodeJS-Server-Example/master/docs/mock-file.md';

router.get('/mock-file', (req, res) => {
	get(url, resp => {
		let data = '';
		resp.on('data', chunk => data += chunk);
		resp.on('end', () => res.json(data));
	}).on('error', err => {
		console.error(err);
		res.sendStatus(500);
	});
});

export default router;