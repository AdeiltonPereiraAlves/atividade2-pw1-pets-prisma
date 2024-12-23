import { Request, Response } from "express";
import Petshop from "../core/model/Petshop";
import Pet from "../core/model/Pet";
import EditPet from "../core/useCase/pets/EditPet";
import PetshopRepository from "../adapters/db/PetshopRepository";
import PetshopRepositoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
import Validator from "../core/utils/Validator";


export default class EditPetController {
  static async edit(req: Request, res: Response): Promise<any> {
    try {
      const petShop: Petshop = req.petshop;
      const { id } = req.params;
      const cnpj:string = petShop.cnpj
   
      const existId = Validator.validateId(id)
      if (!petShop ) {
        res.status(400).json({ error: "Petshop não informado ou inválido." });
        return;
      }
      if (!cnpj ) {
        res.status(400).json({ error: " inválido." });
        return;
      }

      if (!existId) {
        res.status(400).json({ error: "ID do pet Inválido." });
        return;
      }
      console.log(id, "id no controler")
      const petEdit:Partial<Pet> = {
        
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        vaccinated: req.body.vaccinated || false,
        deadline_vaccination: req.body.deadline_vaccination,
      };
      

      const editPetNow = new EditPet(new PetshopRepositoryPrisma());
      const petEdited = await editPetNow.edit(cnpj,id,petEdit);

      console.log(petEdited, "Pet editado")
     
      if (petEdited.length===0) {
        res
          .status(404)
          .json({ error: "Pet não encontrado ou não foi possível editar." });
        return;
      }
      
      res.status(200).json(petEdited);
    } catch (error: any) {
      console.error("Erro no controlador de edição de pets:", error.message);
      res.status(404).json({ erro: "Pet Não existe" });
    }
  }
}
