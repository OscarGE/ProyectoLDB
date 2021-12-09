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
exports.providersController = void 0;
const database_1 = __importDefault(require("../database"));
//Se definen lo que realizarán las peticiones 
class ProvidersController {
    //Se ejecuta la query para listar todos los proveedores
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para mostrar un proveedor por su id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para registrar un usuario
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idP;
            //Se realiza la consulta de registro en la tabla providers 
            yield database_1.default.query('INSERT INTO providers(name,description) VALUES ("' + req.body.name + '", "' + req.body.description + '");', function (err, result, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    if (result.affectedRows == 1) {
                        yield database_1.default.query('SELECT id FROM providers WHERE name = "' + req.body.name + '";', function (err, result, fields) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                idP = Object.values(JSON.parse(JSON.stringify(result)));
                                yield database_1.default.query('INSERT INTO locations(id_provider,country,state,city,postal,address) VALUES (' + idP[0].id + ', "' + req.body.country + '", "' + req.body.state + '", "' + req.body.city + '", "' + req.body.postal + '", "' + req.body.address + '");', function (err, result, fields) {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        if (err)
                                            throw err;
                                        if (result.affectedRows == 1) {
                                            //Consulta para insertar los contactos en la tabla de contacts
                                            for (var i = 0; i < req.body.type.length; i++) {
                                                yield database_1.default.query('INSERT INTO contacts(id_provider, type, contact) VALUES (' + idP[0].id + ',"' + req.body.type[i] + '","' + req.body.contact[i] + '");', function (err, result, fields) {
                                                    return __awaiter(this, void 0, void 0, function* () {
                                                        if (err)
                                                            throw err;
                                                    });
                                                });
                                            }
                                        }
                                    });
                                });
                            });
                        });
                        //Se realiza la consulta de registro en la tabla locations
                    }
                });
            });
            res.json({ message: 'Proveedor registrado' });
        });
    }
    //Se ejecuta la query para actualizar un proveedor por su id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para eliminar un proveedor por su id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query que verifica si ya existe el email
    isExistProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            yield database_1.default.query('SELECT * FROM providers WHERE name = ?', [name], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json({ message: 'Existe' });
                }
                return res.json({ message: 'No existe' });
            });
        });
    }
}
exports.providersController = new ProvidersController();
