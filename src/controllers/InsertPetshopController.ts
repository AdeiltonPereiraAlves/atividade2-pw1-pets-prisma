import { Response, Request } from "express";
import RegisterPetshop, { RegisterPetshopResponse } from "../core/useCase/Petshop/RegisterPetshop";
import Petshop from "../core/model/Petshop";


export default class PetshopController {
  constructor( private registerPetshop: RegisterPetshop ){}
 async insert(req: Request, res: Response): Promise<void> {
    try {
      const { name, cnpj, pets } = req.body;

     
      const newPetshop:RegisterPetshopResponse = await this.registerPetshop.execute({
        name,
        cnpj,
        pets,
      });
      console.log(newPetshop, "newPetshop");
      if (newPetshop.sucess === false) {
        res.status(400).json({ error: newPetshop.message });
        return
        
      }
      
       res.status(201).json(newPetshop.data);
    } catch (error) {
        res.status(500).json({ error: "Erro de servidor" });
    }
  }
}
