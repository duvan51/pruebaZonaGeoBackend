import { db } from '../firebase.js';



const createZona = async (zonaData) => {
    try {
      const res = await db.collection('zonas').add(zonaData);
      return res.id;
    } catch (error) {
      throw new Error('Error al crear la zona: ' + error.message);
    }
  };
  
  const getZonas = async () => {
    try {
      const snapshot = await db.collection('zonas').get();
      const horarios = snapshot.docs.map(doc => doc.data());
      return horarios;
    } catch (error) {
      throw new Error('Error al obtener las zonas: ' + error.message);
    }
  };




  //search zonas por nombre
  
  const searchByName = async (nombre) =>{
      const snapshot = await db.collection('zonas')
      .orderBy('nombre')
      .startAt(nombre)
      .endAt(nombre + '\uf8ff')
      .get();

      const resultados = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Cantidad de resultados:', resultados.length);

      return resultados;
  }




  const createZonaConhorario = async ({ nombre, color, horario, coordenadas}) => {
    try {
      const horarioRef = await db.collection('horarios').add(horario);
      const zonaData = {
        nombre,
        color,
        coordenadas,
        horarioRef: horarioRef.id, // referencia directa
        createdAt: new Date()
      };

      const zonaRef = await db.collection('zonas').add(zonaData);
      
      
      return { id: zonaRef.id, ...zonaData };


    } catch (error) {
        console.error('Error creando zona con horario:', error);
        throw error;
    }
  };




  const getAllZonasHorario = async () => {
    try {
      const zonasSnap = await db.collection('zonas').get();
      if (zonasSnap.empty) {
        throw new Error('No hay zonas');
      }
  
      const zonas = [];
  
      for (const zonac of zonasSnap.docs) {
        const zonaData = zonac.data();
        const horarioReferenciado = zonaData.horarioRef;
  
        let horarioData = [];
  
        if (horarioReferenciado) {
          try {
            const horarioRelacionado = await db
              .collection('horarios')
              .doc(horarioReferenciado)
              .get();
  
            if (horarioRelacionado.exists) {
              horarioData = horarioRelacionado.data();
            }
          } catch (e) {
            console.warn(`Error al obtener el horario para zona ${zonac.id}`);
          }
        }
  
        const zonaConHorario = {
          id: zonac.id,
          nombre: zonaData.nombre,
          color: zonaData.color,
          coordenadas: zonaData.coordenadas || [], // ← aquí se añaden las coordenadas
          horario: horarioData || [],
        };
  
        zonas.push(zonaConHorario);
      }
  
      return zonas;
    } catch (error) {
      console.error('Error al obtener las zonas y horarios:', error);
      throw new Error('Error al obtener las zonas y horarios');
    }
  };
  



  const getById = async (idZona)=>{

    console.log("zona=>", idZona)
    try {
      const zonaDoc = await db.collection('zonas').doc(idZona).get();
      if(!zonaDoc.exists){
        throw Error (`La zona con ID ${idZona} no existe`);

      }
      const zonaData = zonaDoc.data();
      const horarioReferenciado = zonaData.horarioRef;

      let horarioData = null;

      if (horarioReferenciado) {
        try {
          const horarioDoc = await db.collection('horarios').doc(horarioReferenciado).get();
          if (horarioDoc.exists) {
            horarioData = horarioDoc.data();
          }
        } catch (err) {
          console.warn(`Error al obtener el horario para la zona ${idZona}`);
        }
      }

      return {
        id: zonaDoc.id,
        nombre: zonaData.nombre,
        color: zonaData.color,
        coordenadas: zonaData.coordenadas || [],
        horario: horarioData || {},
      };

    } catch (error) {
      console.error(`Error al obtener la zona por ID ${idZona}:`, error);
      throw new Error('Error al obtener la zona');
      
    }
  }

  


export { createZona, getZonas, createZonaConhorario, getAllZonasHorario, searchByName, getById};