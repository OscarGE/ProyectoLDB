import { Router } from 'express';
import { salesController } from '../controllers/salesController';

//Ruta para trabajar con la tabla sales de la base de datos
class SalesRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/list/:id_user', salesController.list); //listar todas las ventas
    this.router.get('/one/:id', salesController.getOne); //mostrar una venta por su id
    this.router.post('/',salesController.register); //registrar una venta
    this.router.put('/:id', salesController.update); //actualizar una venta por su id
    this.router.delete('/:id', salesController.delete); //eliminar una venta por su id
  }
}

const salesRoutes = new SalesRoutes;
export default salesRoutes.router;