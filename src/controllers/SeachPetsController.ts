import PetshopRepository from "../adapters/db/PetshopRepository";
import PetshopRepositoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
import Erros from "../core/constants/Erros";
import Pet from "../core/model/Pet";
import Petshop from "../core/model/Petshop";
import seachPets from "../core/useCase/pets/SearchPets";
import { Response, Request } from "express";
export default class BuscarPetsController {
  static async seachPets(req: Request, res: Response): Promise<Response | any> {
    try {
      const petShop: Petshop = req.petshop;
    
      const id = petShop.id
     
      const seachPetshop = new seachPets(new PetshopRepositoryPrisma());
      console.log(seachPetshop)
      const arrayPets = await seachPetshop.seach(id);
      console.log(arrayPets)
      if (arrayPets.length === 0) {
        res.status(404).json(Erros.PETS_NAO_ENCOTRADOS);
        return
      }
      if(typeof arrayPets === 'string'){
        res.status(404).json({erro: Erros.ID_INVALIDO})
        return
      }
      
      res.status(200).json(arrayPets);
      
    } catch (error) {
      res.status(404).json({ erro: "Erro desconhecido" });
    }
  }
}
