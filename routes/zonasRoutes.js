import express from 'express';
import { addZona, crearZonaHorario, listZonas, searchZonas} from '../controllers/zonasControllers.js';


const router = express.Router();


//router.post('/', addZona)

router.post('/', crearZonaHorario);

router.get('/', listZonas);

router.get('/buscar', searchZonas);


export default router;