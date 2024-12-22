import Petshop from "../core/model/Petshop";
import { Request, Response } from "express";
import RegisterPet from "../core/useCase/pets/RegisterPet";
import PetshopRepository from "../adapters/db/PetshopRepository";
import Pet from "../core/model/Pet";
import Id from "../core/shared/Id";
import PetshopRepositoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
export default class InsertPetController {
  static async insert(req: Request, res: Response): Promise<boolean | any> {
    try {
      const { name, type, description, deadline_vaccination } = req.body;

      const petShop: Petshop = req.petshop;
      console.log(petShop,deadline_vaccination,"petshop e D")
      const cnpj = petShop.cnpj;
      console.log(cnpj, "cnpj")

      
      if (!name || !type || !description || !deadline_vaccination) {
        return res.status(400).json({ error: "Campos obrigatórios não fornecidos." });
      }
      const deadlineDate = new Date(deadline_vaccination);
      if (isNaN(deadlineDate.getTime())) {
        return res.status(400).json({ error: "Data de vacinação inválida." });
      }
     
      const pet: Pet = {
        name,
        type,
        description,
        vaccinated: false,
        deadline_vaccination:deadlineDate, // Certifique-se de que a data seja válida
        created_at: new Date(),
      };
      console.log(pet, "Pet")
      const RegisterPetNow = new RegisterPet(new PetshopRepositoryPrisma());
      const petCreated: Pet | any = await RegisterPetNow.register(cnpj, pet);

      console.log(petCreated, "petcreated")
      if (!petCreated) {
        res.status(404).json({ error: "Pet não criado." });
        return;
      }
      res.status(201).json(petCreated);
    } catch (erro) {
      res.status(404).json({ erro: "Erro desconhecido" });
    }
  }
}
