import { Request, Response } from "express";
import Petshop from "../core/model/Petshop";
import Validador from "../core/utils/Validator";
import DeletePet from "../core/useCase/pets/DeletePet";
import PetshopRepositoryPrisma from "../adapters/db/PetshopRepositoryPrisma";

export default class DeletePetController {
  constructor(private deletePet: DeletePet) {}
  async delete(req: Request, res: Response) {
    try {
      const petShop: Petshop = req.petshop;
      const { id } = req.params;
      const isId = Validador.validateId(id);
      if (!isId) {
        res.status(404).json({ erro: "id inválido" });
        return;
      }
      if (!petShop) {
        res.status(404).json({ erro: "petshop inválido" });
        return;
      }
      const petDelete = {
        id,
        cnpj: petShop.cnpj,
      };

      const arrayPets = await this.deletePet.execute(petDelete);
      if (arrayPets.length === 0) {
        res.status(404).json({ erro: "Não existe esse pet" });
        return;
      }
      res.status(200).json(arrayPets);
    } catch (error) {
      res.status(404).json({ erro: "Erro ao deletar pet" });
    }
  }
}
