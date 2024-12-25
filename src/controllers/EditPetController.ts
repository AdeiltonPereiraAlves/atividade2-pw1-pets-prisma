import { Request, Response } from "express";
import Petshop from "../core/model/Petshop";
import Pet from "../core/model/Pet";
import EditPet from "../core/useCase/pets/EditPet";
import PetshopRepository from "../adapters/db/PetshopRepository";
import PetshopRepositoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
import Validator from "../core/utils/Validator";
import  Dto  from "../core/useCase/pets/EditPet";


export default class EditPetController {
  static async edit(req: Request, res: Response): Promise<any> {
    try {
      const petShop: Petshop = req.petshop;
      const { id } = req.params;
      const cnpj = petShop.cnpj
      
      const { name, type, description, deadline_vaccination } = req.body;
      const existId = Validator.validateId(id)
      if (!petShop.id ) {
        res.status(400).json({ error: "Petshop não informado ou inválido." });
        return;
      }
     
    
      if (!existId) {
        res.status(400).json({ error: "ID do pet Inválido." });
        return;
      }
      console.log(id, "id no controler")
    
      const petDados:Dto | any = {
        id,
        name,
        type,
        description,
        deadline_vaccination ,
       
        cnpj
      };
      
      console.log(petDados, "Petdados")
      const editPetNow = new EditPet(new PetshopRepositoryPrisma());
      const petEdited = await editPetNow.execute(petDados);

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
