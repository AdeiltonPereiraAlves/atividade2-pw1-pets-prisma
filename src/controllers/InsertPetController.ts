import Petshop from "../core/model/Petshop";
import { Request, Response } from "express";
import RegisterPet from "../core/useCase/pets/RegisterPet";

import Pet from "../core/model/Pet";

import Erros from "../core/constants/Erros";
export default class InsertPetController {
  constructor(private registerPet: RegisterPet){}
  async insert(req: Request, res: Response): Promise<boolean | any> {
    try {
      const { name, type, description, deadline_vaccination } = req.body;
      const petShop: Petshop = req.petshop;
     
      console.log(petShop,deadline_vaccination,"petshop e D")
      const petshopId = petShop.id!;
     
      
      
      if (!name || !type || !description || !deadline_vaccination || !petshopId) {
        return res.status(400).json({ error: "Campos obrigatórios não fornecidos." });
      }
    
     
     
    
      
      const petCreated: Pet = await this.registerPet.execute({name , type, description, deadline_vaccination, petshopId});

      
      res.status(201).json(petCreated);
    } catch (erro: any) {
      if(erro.message ===Erros.PET_NAO_REGISTRADO){
        res.status(404).json({error: "erro ao registrar pet"})
      }
      res.status(500).json({ erro: "Erro desconhecido" });
    }
  }
}
