import DDOS from 'ddos';
import { Router } from 'express';

const ddos = new DDOS();
const router = Router();

router.use(ddos.express);

router.get('/hello/:name', (req, res) => res.send(`Hello ${ req.params.name }!`));

export default router;