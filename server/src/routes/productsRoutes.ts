import { Router } from 'express';
import { productsController } from '../controllers/productsController';

//Ruta para trabajar con la tabla products de la base de datos
class ProductsRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/list/:id_user', productsController.list); //listar todos los productos
    this.router.get('/one/:id', productsController.getOne); //mostrar un producto por su id
    this.router.post('/',productsController.register); //registrar un producto
    this.router.put('/:id', productsController.update); //actualizar un producto por su id
    this.router.delete('/:id', productsController.delete); //eliminar un producto por su id
    this.router.post('/get-providersList/:id_user', productsController.providersList); //enviar lista de proveedores
    this.router.post('/get-categoriesList', productsController.categoriesList); //enviar lista de categorías
  }
}

const productsRoutes = new ProductsRoutes;
export default productsRoutes.router;