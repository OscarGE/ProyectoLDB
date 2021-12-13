import { Request, Response } from 'express';
import pool from '../database';

//Se definen lo que realizarán las peticiones 
class ProductsController {
  //Se ejecuta la query para listar todos los productos
  public async list(req: Request, res: Response): Promise<void> {
    const { id_user } = req.params;
    await pool.query('SELECT * FROM products WHERE id_user = ?', [id_user], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'Este usario no tiene productos' });
    });
  }
  //Se ejecuta la query para listar todos los productos con stock menor a 0
  public async listStock(req: Request, res: Response): Promise<void> {
    const { id_user } = req.params;
    await pool.query(`
                    SELECT p.id_user, p.id, p.name, p.description, p.registered_at, p.price, p.stock, v.name AS nameProvider, v.id AS idProvider, c.category, c.id AS idCategory
                    FROM products p 
                    INNER JOIN providers v 
                    ON p.id_provider=v.id 
                    INNER JOIN categories c 
                    ON p.id_category=c.id
                    WHERE p.id_user = ? AND p.stock > 0
                    ORDER BY p.registered_at DESC`, [id_user], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'Este usario no tiene productos' });
    });
  }
  //Se ejecuta la query para mostrar un producto por su id
  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    await pool.query(`
                      SELECT p.id, p.name, p.description, p.registered_at, p.price, p.stock, v.name AS nameProvider, v.id AS idProvider, c.category, c.id AS idCategory
                      FROM products p 
                      INNER JOIN providers v 
                      ON p.id_provider=v.id 
                      INNER JOIN categories c 
                      ON p.id_category=c.id
                      WHERE p.id = ?`, [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result[0]);
      }
      res.status(404).json({ message: 'Proveedor no encontrado' });
    });
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
    const { id } = req.params;
    await pool.query('SELECT * FROM products WHERE id = ?', [id],async function(err, result, fields) {
      if (err) throw err;
      if(result[0]){ //Si existe el producto
        //Se ejecuta la query para actualizar al producto
        await pool.query('UPDATE products set ? WHERE id = ?', [req.body, id],function(err, result, fields) {
          if (err) throw err;
          if(result.affectedRows==1){
            res.json({message: 'El producto fue actualizado'});
          }else{
            res.status(404).json({message: 'Producto no actualizado'});
          }
        });
      }else{
        res.status(404).json({message: 'Producto no encontrado'});
      }
    }); 
  }
  //Se ejecuta la query para eliminar un producto por su id
  public async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo 
    await pool.query('DELETE FROM products WHERE id = ?', [id],function(err, result, fields) {
      if (err) throw err;
      if(result.affectedRows==1){
        res.json({message: 'El producto fue eliminado'});
      }
      else{
        res.status(404).json({message: 'Producto no encontrado'}); 
      }
    });
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