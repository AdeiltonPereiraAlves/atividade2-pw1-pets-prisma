import PetshopRepository from "../adapters/db/PetshopRepository";
import PetshopRepositoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
import Pet from "../core/model/Pet";
import Petshop from "../core/model/Petshop";
import seachPets from "../core/useCase/pets/SearchPets";
import { Response, Request } from "express";
export default class BuscarPetsController {
  static async seachPets(req: Request, res: Response): Promise<Response | any> {
    try {
      const petShop: Petshop = req.petshop;
       console.log("Chegounno controler")
      if(!petShop){
        res.status(404).json({erro: 
          "Erro petshop não existe"
        })
      }
      const id = petShop.id
      if(!id){
        res.status(404).json({erro: 
          "Erro id não existe"
        })
      }
      const seachPetshop = new seachPets(new PetshopRepositoryPrisma());
      console.log(seachPetshop)
      const arrayPets = await seachPetshop.seach(id);
      console.log(arrayPets)
      if (arrayPets) {
        res.status(200).json(arrayPets);
      } else {
        res.status(404).json("Não existe pets");
      }
    } catch (error) {
      res.status(404).json({ erro: "Erro desconhecido" });
    }
  }
}
