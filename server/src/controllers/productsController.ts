import { Request, Response } from 'express';
import pool from '../database';

//Se definen lo que realizarán las peticiones 
class ProductsController {
  //Se ejecuta la query para listar todos los productos
  public async list(req: Request, res: Response): Promise<void> {
    
  }
  //Se ejecuta la query para mostrar un producto por su id
  public async getOne(req: Request, res: Response): Promise<any> {
    
  }
  //Se ejecuta la query para registrar un producto
  public async register(req: Request, res: Response): Promise<void> {
    //Se realiza la consulta de registro en la tabla products 
    await pool.query('INSERT INTO products(id_user,name,description,price,stock,id_provider,id_category) VALUES ("'+req.body.id_user+'","'+req.body.name+'", "'+req.body.description+'", "'+req.body.price+'", "'+req.body.stock+'", "'+req.body.id_provider+'", "'+req.body.id_category+'");',async function(err, result, fields){
      if (err) throw err;
      res.json({message: 'Proveedor registrado'});
    });
  }
  //Se ejecuta la query para actualizar un producto por su id
  public async update(req: Request, res: Response): Promise<any> {
   
  }
  //Se ejecuta la query para eliminar un producto por su id
  public async delete(req: Request, res: Response): Promise<any> {
    
  }
  
  //Se ejecuta la query que recupera la lista de proveedores
  public async providersList(req: Request, res: Response): Promise<any>{
    const { id_user } = req.params;
    await pool.query('SELECT id, name FROM providers  WHERE id_user = ?', [id_user], function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  }
  //Se ejecuta la query que recupera la lista de categorías
  public async categoriesList(req: Request, res: Response): Promise<any>{
    await pool.query('SELECT id, category FROM categories', function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  }
}
export const  productsController = new  ProductsController();