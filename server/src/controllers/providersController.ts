import { Request, Response } from 'express';
import pool from '../database';

//Se definen lo que realizarán las peticiones 
class ProvidersController {
  //Se ejecuta la query para listar todos los proveedores
  public async list(req: Request, res: Response): Promise<void> {
    const { id_user } = req.params;
    await pool.query('SELECT * FROM providers WHERE id_user = ?', [id_user], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'Este usario no tiene proveedores' });
    });
  }
  //Se ejecuta la query para mostrar un proveedor por su id
  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    await pool.query(`
                      SELECT p.id, p.name, p.description, p.registered_at, l.country, l.state, l.city, l.postal, l.address, GROUP_CONCAT(c.type) AS type, GROUP_CONCAT(c.contact) AS contact 
                      FROM providers p 
                      INNER JOIN locations l 
                      ON p.id=l.id_provider 
                      INNER JOIN contacts c 
                      ON p.id=c.id_provider
                      WHERE p.id = ?`, [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result[0]);
      }
      res.status(404).json({ message: 'Proveedor no encontrado' });
    });
  }
  //Se ejecuta la query para registrar un proveedore
  public async register(req: Request, res: Response): Promise<void> {
    var idP:any
    //Se realiza la consulta de registro en la tabla providers 
    await pool.query('INSERT INTO providers(id_user,name,description) VALUES ("'+req.body.id_user+'","'+req.body.name+'", "'+req.body.description+'");',async function(err, result, fields){
      if (err) throw err;
      if(result.affectedRows==1){
        await pool.query('SELECT id FROM providers WHERE name = "'+req.body.name+'" AND id_user = "'+req.body.id_user+'" ;',async function(err, result, fields){
          if (err) throw err;
          idP=Object.values(JSON.parse(JSON.stringify(result)))
          //Se realiza la consulta de registro en la tabla locations
          await pool.query('INSERT INTO locations(id_provider,country,state,city,postal,address) VALUES ('+idP[0].id+', "'+req.body.country+'", "'+req.body.state+'", "'+req.body.city+'", "'+req.body.postal+'", "'+req.body.address+'");',async function(err, result, fields){
            if (err) throw err;
            if(result.affectedRows==1){
              //Consulta para insertar los contactos en la tabla de contacts
              for(var i=0; i<req.body.type.length; i++){
                await pool.query('INSERT INTO contacts(id_provider, type, contact) VALUES ('+idP[0].id+',"'+req.body.type[i]+'","'+req.body.contact[i]+'");',async function(err, result, fields){
                  if (err) throw err;
                });
              }            
            }
          });
        });
      }
    });
    res.json({message: 'Proveedor registrado'});
  }
  //Se ejecuta la query para actualizar un proveedor por su id
  public async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    await pool.query('SELECT * FROM providers WHERE id = ?', [id],async function(err, result, fields) {
      if (err) throw err;
      if(result[0]){ //Si existe el proveedor
        //Se ejecuta la query para actualizar al proveedor
        await pool.query('UPDATE providers SET name="'+req.body.name+'", description="'+req.body.description+'" WHERE id = ?', [id], async function(err, result, fields) {
          if (err) throw err;
          if(result.affectedRows==1){
            //Se realiza la consulta de actualización en la tabla locations
            await pool.query('UPDATE locations SET country= "'+req.body.country+'", state="'+req.body.state+'", city="'+req.body.city+'", postal=  "'+req.body.postal+'", address="'+req.body.address+'" WHERE id_provider = ?', [id], async function(err, result, fields){
              if (err) throw err;
              if(result.affectedRows==1){
                //Se elimina los registros de la tabla contacts para volver a insertarlos con la nueva información 
				        await pool.query('DELETE FROM contacts WHERE id_provider = ?',[id],async function(err, result, fields) {
                  //Consulta para insertar los contactos en la tabla de contacts
                  for(var i=0; i<req.body.type.length; i++){
                    await pool.query('INSERT INTO contacts(id_provider, type, contact) VALUES ("'+id+'","'+req.body.type[i]+'","'+req.body.contact[i]+'");',async function(err, result, fields){
                      if (err) throw err;
                    });
                  }
                });
              }
            });
            res.json({message: 'El proveedor fue actualizado'});
          }else{
            res.status(404).json({message: 'Proveedor no actualizado'});
          }
        });
      }else{
        res.status(404).json({message: 'Proveedor no encontrado'});
      }
    }); 
  }
  //Se ejecuta la query para eliminar un proveedor por su id
  public async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo 
    await pool.query('DELETE FROM providers WHERE id = ?', [id],function(err, result, fields) {
      if (err) throw err;
      if(result.affectedRows==1){
        res.json({message: 'El proveedor fue eliminado'});
      }
      else{
        res.status(404).json({message: 'Proveedor no encontrado'}); 
      }
    });
  }
  
  //Se ejecuta la query que verifica si ya existe el proveedores
  public async isExistProvider(req: Request, res: Response): Promise<any>{
      await pool.query('SELECT * FROM providers WHERE name = "'+req.body.name+'" AND id_user = "'+req.body.id_user+'";',function(err, result, fields) {
        if (err) throw err;
        if(result.length>0){
          return res.json({message: 'Existe'});
        }
        return res.json({message: 'No existe'});
      });
  }
}
export const providersController = new ProvidersController();