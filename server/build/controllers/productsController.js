"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = void 0;
const database_1 = __importDefault(require("../database"));
//Se definen lo que realizarán las peticiones 
class ProductsController {
    //Se ejecuta la query para listar todos los productos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para mostrar un producto por su id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para registrar un producto
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Se realiza la consulta de registro en la tabla products 
            yield database_1.default.query('INSERT INTO products(id_user,name,description,price,stock,id_provider,id_category) VALUES ("' + req.body.id_user + '","' + req.body.name + '", "' + req.body.description + '", "' + req.body.price + '", "' + req.body.stock + '", "' + req.body.id_provider + '", "' + req.body.id_category + '");', function (err, result, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    res.json({ message: 'Proveedor registrado' });
                });
            });
        });
    }
    //Se ejecuta la query para actualizar un producto por su id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para eliminar un producto por su id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query que recupera la lista de proveedores
    providersList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.params;
            yield database_1.default.query('SELECT id, name FROM providers  WHERE id_user = ?', [id_user], function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    //Se ejecuta la query que recupera la lista de categorías
    categoriesList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT id, category FROM categories', function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
}
exports.productsController = new ProductsController();
