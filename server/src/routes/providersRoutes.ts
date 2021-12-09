import { Router } from 'express';
import { providersController } from '../controllers/providersController';

//Ruta para trabajar con la tabla providers de la base de datos
class ProvidersRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/', providersController.list); //listar todos los proveedores
    this.router.get('/:id', providersController.getOne); //mostrar un proveedor por su id
    this.router.post('/',providersController.register); //registrar un proveedor
    this.router.put('/:id', providersController.update); //actualizar un proveedor por su id
    this.router.delete('/:id', providersController.delete); //eliminar un proveedor por su id
    this.router.get('/verify-isExistProvider/:name', providersController.isExistProvider); //Validar el nombre de proveedor
  }
}

const providersRoutes = new ProvidersRoutes;
export default providersRoutes.router;