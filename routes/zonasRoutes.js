import express from 'express';
import { addZona, crearZonaHorario, listZonas, searchZonas, getZonaById} from '../controllers/zonasControllers.js';


const router = express.Router();


//router.post('/', addZona)

router.post('/', crearZonaHorario);

router.get('/', listZonas);

router.get('/buscar', searchZonas);

router.get('/:id', getZonaById);



export default router;