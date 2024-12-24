import Petshop from "../core/model/Petshop";
import { Request, Response } from "express";
import RegisterPet, { Dto } from "../core/useCase/pets/RegisterPet";

import Pet from "../core/model/Pet";

import PetshopRepositoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
import Erros from "../core/constants/Erros";
export default class InsertPetController {
  static async insert(req: Request, res: Response): Promise<boolean | any> {
    try {
      const { name, type, description, deadline_vaccination } = req.body;
      const petShop: Petshop = req.petshop;
     
      console.log(petShop,deadline_vaccination,"petshop e D")
      const cnpj = petShop.cnpj;
     
      console.log(cnpj, "cnpj")
      if(!petShop){
        return Erros.PETSHOP_NAO_EXISTE
      }
      if(!petShop.id){
        return Erros.ID_INVALIDO
      }
      
      if (!name || !type || !description || !deadline_vaccination) {
        return res.status(400).json({ error: "Campos obrigatórios não fornecidos." });
      }
    
      const dadosPet: Dto = {name , type, description, deadline_vaccination, petshopId:petShop.id}
     
    
      const RegisterPetNow = new RegisterPet(new PetshopRepositoryPrisma());
        const petCreated: Pet = await RegisterPetNow.execute(dadosPet);

      console.log(petCreated, "petcreated")
      if (!petCreated) {
        res.status(404).json({ error: Erros.PET_NAO_REGISTRADO });
        return;
      }
      res.status(201).json(petCreated);
    } catch (erro) {
      res.status(404).json({ erro: "Erro desconhecido" });
    }
  }
}
