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
exports.salesController = void 0;
const database_1 = __importDefault(require("../database"));
//Se definen lo que realizarán las peticiones 
class SalesController {
    //Se ejecuta la query para listar todas las ventas
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para mostrar una venta por su id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para registrar una venta
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idS;
            //Se realiza la consulta de registro en la tabla sales 
            yield database_1.default.query('INSERT INTO sales(id_user) VALUES ("' + req.body.id_user + '");', function (err, result, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    yield database_1.default.query('SELECT (SELECT id FROM sales ORDER BY id DESC LIMIT 1) AS id;', function (err, result, fields) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw err;
                            idS = Object.values(JSON.parse(JSON.stringify(result)));
                            console.log(idS);
                            yield database_1.default.query('INSERT INTO info_sales(id_sales,id_product,id_provider,customer,amount,quantity,price) VALUES ("' + idS[0].id + '","' + req.body.id_product + '","' + req.body.id_provider + '","' + req.body.customer + '","' + req.body.amount + '","' + req.body.quantity + '","' + req.body.price + '");', function (err, result, fields) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    if (err)
                                        throw err;
                                    yield database_1.default.query('UPDATE products set stock = (SELECT(SELECT stock FROM products WHERE id = "' + req.body.id_product + '" ) - ' + req.body.quantity + ') WHERE id = "' + req.body.id_product + '" ', function (err, result, fields) {
                                        return __awaiter(this, void 0, void 0, function* () {
                                            if (err)
                                                throw err;
                                            res.json({ message: 'Venta registrada' });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    //Se ejecuta la query para actualizar una venta por su id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para eliminar una venta por su id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.salesController = new SalesController();
