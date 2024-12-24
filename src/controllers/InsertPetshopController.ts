import { Response, Request } from "express";
import RegisterPetshop, { Dto } from "../core/useCase/Petshop/RegisterPetshop";
import Petshop from "../core/model/Petshop";

import PetshopResitoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
import Erros from "../core/constants/Erros";

export default class PetshopController {
  static async insert(req: Request, res: Response): Promise<Response | any> {
    try {
      const { name, cnpj } = req.body;

      const ObjPetshop: Dto = {
        name: name,
        cnpj: cnpj,
        pets: [],
      };

      const registerPetshop = new RegisterPetshop(new PetshopResitoryPrisma());
      const newPetshop: Petshop | boolean | string = await registerPetshop.execute(ObjPetshop);
      if(newPetshop === false){
        res.status(400).json({erro: Erros.CNPJ_JA_EXISTE})
        return
      }
      if(typeof newPetshop === "string"){
         return res.status(400).json({erro: newPetshop})
      }
      res.status(201).json(newPetshop);
    } catch (error) {
      res.status(500).json({ erro: "Erro de servidor" });
    }
  }
}
