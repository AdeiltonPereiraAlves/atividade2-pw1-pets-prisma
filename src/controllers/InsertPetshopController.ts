import PetshopRepository from "../adapters/db/PetshopRepository";
import { Response, Request, NextFunction } from "express";
import Id from "../core/shared/Id";
import RegisterPetshop from "../core/useCase/Petshop/RegisterPetshop";
import Petshop from "../core/model/Petshop";
import BuscarPets from "../core/useCase/pets/SearchPets";
import Validator from "../utils/Validator";
import PetshopResitoryPrisma from "../adapters/db/PetshopRepositoryPrisma";

export default class PetshopController {
  static async insert(req: Request, res: Response): Promise<Response| any> {
    try {
      const {name, cnpj} = req.body
      const validateCnpj =  Validator.validateCnpj(cnpj)
     
      if(!validateCnpj){
        res.status(400).json({erro: "Cnpj Inválido"})
        return
      }
      
      const ObjPetshop:Partial<Petshop> = {
       
        name: name,
        cnpj:cnpj,
        
      };
      
      const registerPetshop = new RegisterPetshop(new PetshopResitoryPrisma());
      const newPetshop:Petshop | any = await registerPetshop.execute(ObjPetshop);

      console.log(newPetshop,"newPetshop")
      if(!newPetshop){
        return res.status(404).json({erro: "Erro cnpj ja existe "})
      }
     
      res.status(201).json(newPetshop);

    
     
    } catch (error) {
      res.status(404).json({erro: "cnpj já existe"})
    }
  }
  
}
