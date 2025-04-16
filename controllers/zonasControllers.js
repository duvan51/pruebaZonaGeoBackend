import {
    createZona,
    createZonaConhorario, 
    getAllZonasHorario,
    searchByName,
    getById
}from '../services/zonasServices.js'


const addZona = async (req, res) => {
    const ZonaData = req.body;
    try {
      const id = await createZona(ZonaData);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


const listZonas = async (req, res) => {
  try {
    const horarios = await getAllZonasHorario();
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const crearZonaHorario = async (req, res) => {
  try {
    const nuevaZona = await createZonaConhorario(req.body);
    res.status(201).json(nuevaZona);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear zona con horario' });
  }
};

const searchZonas = async (req, res) => {
  try {
    const { nombre } = req.query;
    const zonas = await searchByName(nombre);
    res.json(zonas);
  } catch (error) {
    res.status(500).json({ error: "Error en la búsqueda" });
  }
};

const getZonaById = async (req, res) => {
  const idZona = req.params.id;
  try {
    const zonas = await getById(idZona);
    res.status(200).json(zonas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






  
export { addZona, listZonas, crearZonaHorario, searchZonas, getZonaById};