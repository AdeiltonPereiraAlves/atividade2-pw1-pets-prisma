import Erros from "../core/constants/Erros";

import Petshop from "../core/model/Petshop";
import SeachPets, { petsFoundsResponse } from "../core/useCase/pets/SearchPets";

import { Response, Request } from "express";
export default class BuscarPetsController {
  constructor(private seachPetsNow: SeachPets){}
   async seachPets(req: Request, res: Response): Promise<Response|any> {
    
    try {
      const petShop: Petshop = req.petshop;
    
      const id = petShop.id!
     
 
      const arrayPets:petsFoundsResponse = await this.seachPetsNow.execute({id});
      console.log(arrayPets)
      if (arrayPets.dados.length === 0) {
        res.status(404).json(Erros.PETS_NAO_ENCOTRADOS);
        return
      }
      if(arrayPets.sucess === false){
        res.status(404).json({erro: Erros.ID_INVALIDO})
        return
      }
      
      res.status(200).json(arrayPets.dados);
      
    } catch (error) {
      res.status(404).json({ erro: "Erro desconhecido" });
    }
  }
}
