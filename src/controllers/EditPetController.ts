import { Request, Response } from "express";
import Petshop from "../core/model/Petshop";
import Pet from "../core/model/Pet";
import EditPet, { DtoPetEdite } from "../core/useCase/pets/EditPet";

import Validator from "../core/utils/Validator";
import Dto from "../core/useCase/pets/EditPet";

export default class EditPetController {
  constructor(private editPetNow: EditPet) {}
  async edit(req: Request, res: Response): Promise<Pet | any > {
    try {
      const petShop: Petshop = req.petshop;
      const { id } = req.params;
      const cnpj = petShop.cnpj!;
      const petshopId= petShop.id!;

      const { name, type, description, deadline_vaccination } = req.body;
      const existId = Validator.validateId(id);
      if (!petshopId) {
         res.status(400).json({ error: "Petshop não informado ou inválido." });
        return
      }
     

      if (!existId) {
        res.status(400).json({ error: "ID do pet Inválido." });
        return
        
      }
      console.log(id, "id no controler");

      const petEdited = await this.editPetNow.execute({
        id,
        name,
        type,
        description,
        deadline_vaccination,
        petshopId,
        cnpj,
      });

      console.log(petEdited, "Pet editado");

   

      res.status(200).json(petEdited);
    } catch (error: any) {
      console.error("Erro no controlador de edição de pets:", error.message);
      res.status(404).json({ erro: "Pet Não existe" });
    }
  }
}
