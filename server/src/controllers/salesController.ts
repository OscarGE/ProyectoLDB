import { Request, Response } from 'express';
import pool from '../database';

//Se definen lo que realizarán las peticiones 
class SalesController {
  //Se ejecuta la query para listar todas las ventas
  public async list(req: Request, res: Response): Promise<void> {
    const { id_user } = req.params;
    await pool.query(`SELECT i.customer, i.amount, i.quantity, i.price, i.sale_date, p.name AS nameProduct FROM info_sales i 
                      INNER JOIN products p ON i.id_product = p.id 
                      WHERE i.id_user = ? ORDER BY i.sale_date DESC`, [id_user], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'Venta no encontrado' });
    }); 
  }
  //Se ejecuta la query para listar todas las ventas de hoy
  public async listToday(req: Request, res: Response): Promise<void> {
    const { id_user } = req.params;
    await pool.query(`SELECT i.id_sales, i.id_product, i.id_provider, i.customer, i.amount, i.quantity, i.price, i.sale_date, p.name AS nameProduct FROM info_sales i 
                      INNER JOIN products p ON i.id_product = p.id 
                      WHERE sale_date >= CURDATE() AND sale_date < CURDATE() + INTERVAL 1 DAY AND i.id_user = ?`, [id_user], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'Venta no encontrado' });
    });
  }
 
  //Se ejecuta la query para mostrar una venta por su id
  public async getOne(req: Request, res: Response): Promise<any> {
    
  }
  //Se ejecuta la query para mostrar la lista de clientes
  public async customerList(req: Request, res: Response): Promise<any> {
    const { id_user } = req.params;
    await pool.query(`SELECT id_sales, customer FROM info_sales WHERE id_user = ? GROUP BY customer`, [id_user], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'Venta no encontrado' });
    });
  }
  //Se ejecuta la query para registrar una venta
  public async register(req: Request, res: Response): Promise<void> {
    var idS:any
    var customer:any
    //Se realiza la consulta de registro en la tabla sales 
     await pool.query('SELECT id_sales, customer FROM info_sales WHERE  customer = "'+req.body.customer+'"  AND id_user = "'+req.body.id_user+'" AND customer != ""',async function(err, result, fields){
      if (err) throw err;
      if (result.length > 0) {
        idS=result[0].id_sales
        customer=result[0].customer
        await pool.query('INSERT INTO info_sales(id_sales,id_user,id_product,id_provider,customer,amount,quantity,price) VALUES ("'+idS+'","'+req.body.id_user+'","'+req.body.id_product+'","'+req.body.id_provider+'","'+customer+'","'+req.body.amount+'","'+req.body.quantity+'","'+req.body.price+'");',async function(err, result, fields){
          if (err) throw err;
          await pool.query('UPDATE products set stock = (SELECT(SELECT stock FROM products WHERE id = "'+req.body.id_product+'" ) - '+req.body.quantity+') WHERE id = "'+req.body.id_product+'" ',async function(err, result, fields){
            if (err) throw err;
            res.json({message: 'Venta registrada'});
          });
        });  
      }else{
        await pool.query('INSERT INTO sales(id_user) VALUES ("'+req.body.id_user+'");',async function(err, result, fields){
          if (err) throw err;
            await pool.query('SELECT (SELECT id FROM sales ORDER BY id DESC LIMIT 1) AS id;',async function(err, result, fields){
              if (err) throw err;
              idS=Object.values(JSON.parse(JSON.stringify(result)))
              console.log(idS)
              await pool.query('INSERT INTO info_sales(id_sales,id_user,id_product,id_provider,customer,amount,quantity,price) VALUES ("'+idS[0].id+'","'+req.body.id_user+'","'+req.body.id_product+'","'+req.body.id_provider+'","'+req.body.customer+'","'+req.body.amount+'","'+req.body.quantity+'","'+req.body.price+'");',async function(err, result, fields){
                if (err) throw err;
                await pool.query('UPDATE products set stock = (SELECT(SELECT stock FROM products WHERE id = "'+req.body.id_product+'" ) - '+req.body.quantity+') WHERE id = "'+req.body.id_product+'" ',async function(err, result, fields){
                  if (err) throw err;
                  res.json({message: 'Venta registrada'});
                });
              });
            });
          
        });        
      }

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