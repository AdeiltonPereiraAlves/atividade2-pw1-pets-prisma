import { Response, Request } from "express";
import RegisterPetshop, { Dto, RegisterPetshopResponse } from "../core/useCase/Petshop/RegisterPetshop";
import Petshop from "../core/model/Petshop";

import PetshopResitoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
import Erros from "../core/constants/Erros";

export default class PetshopController {
  static async insert(req: Request, res: Response): Promise<Response | any> {
    try {
      const { name, cnpj, pets } = req.body;

      // const ObjPetshop: Dto = {
      //   name: name,
      //   cnpj: cnpj,
      //   pets: [],
      // };

      const registerPetshop = new RegisterPetshop(new PetshopResitoryPrisma());
      const newPetshop: any = await registerPetshop.execute({name, cnpj, pets});
      console.log(newPetshop)
      if(newPetshop.sucess === false){
        res.status(400).json({erro: newPetshop.message})
        return
      }
     
      res.status(201).json(newPetshop.data);
    } catch (error) {
      res.status(500).json({ erro: "Erro de servidor" });
    }
  }
}
