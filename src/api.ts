import * as express from "express";
import routes from './routesV/index'


const router = express.Router();
router.use('/', routes);

module.exports = router;