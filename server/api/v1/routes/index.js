import DDOS from 'ddos';
import { Router } from 'express';

import mockFileRouter from './mock-file';

const ddos = new DDOS();
const router = Router();

router.use(ddos.express);

router.get('/hello/:name', (req, res) => res.send(`Hello ${ req.params.name }!`));

router.use(mockFileRouter);

export default router;