import { Request, Response } from 'express';
import pool from '../database';

//Se definen lo que realizarán las peticiones 
class SalesController {
  //Se ejecuta la query para listar todas las ventas
  public async list(req: Request, res: Response): Promise<void> {
    
  }
 
  //Se ejecuta la query para mostrar una venta por su id
  public async getOne(req: Request, res: Response): Promise<any> {
    
  }
  //Se ejecuta la query para registrar una venta
  public async register(req: Request, res: Response): Promise<void> {
    var idS:any
    //Se realiza la consulta de registro en la tabla sales 
    await pool.query('INSERT INTO sales(id_user) VALUES ("'+req.body.id_user+'");',async function(err, result, fields){
      if (err) throw err;
        await pool.query('SELECT (SELECT id FROM sales ORDER BY id DESC LIMIT 1) AS id;',async function(err, result, fields){
          if (err) throw err;
          idS=Object.values(JSON.parse(JSON.stringify(result)))
          console.log(idS)
          await pool.query('INSERT INTO info_sales(id_sales,id_product,id_provider,customer,amount,quantity,price) VALUES ("'+idS[0].id+'","'+req.body.id_product+'","'+req.body.id_provider+'","'+req.body.customer+'","'+req.body.amount+'","'+req.body.quantity+'","'+req.body.price+'");',async function(err, result, fields){
            if (err) throw err;
            await pool.query('UPDATE products set stock = (SELECT(SELECT stock FROM products WHERE id = "'+req.body.id_product+'" ) - '+req.body.quantity+') WHERE id = "'+req.body.id_product+'" ',async function(err, result, fields){
              if (err) throw err;
              res.json({message: 'Venta registrada'});
            });
          });
        });
      
    });
  }
  //Se ejecuta la query para actualizar una venta por su id
  public async update(req: Request, res: Response): Promise<any> {
    
  }
  //Se ejecuta la query para eliminar una venta por su id
  public async delete(req: Request, res: Response): Promise<any> {
    
  }
  
 
}
export const  salesController = new  SalesController();