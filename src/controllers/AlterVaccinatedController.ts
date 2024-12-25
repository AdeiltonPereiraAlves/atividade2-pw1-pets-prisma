import { Request, Response } from "express";
import Petshop from "../core/model/Petshop";
import AlterVaccinated, { DtoVaccianted } from "../core/useCase/pets/AlterVaccinated";
import Validador from "../core/utils/Validator";
import Pet from "../core/model/Pet";
import PetshopRepositoryPrisma from "../adapters/db/PetshopRepositoryPrisma";

export default class AlterVaccinatedController {
  static async Alter(req: Request, res: Response): Promise<Pet | any> {
    try {
      const petShop: Petshop = req.petshop;
      const { id } = req.params;

      const isId = Validador.validateId(id);
     
      const cnpjPetshop = petShop.cnpj;
      if (!petShop) {
        res.status(404).json({ erro: "Pethop não existe" });
        return;
      }
      if (!cnpjPetshop) {
        res.status(404).json({ erro: "idPetshop inválido" });
        return;
      }
      if (!isId) {
        res.status(404).json({ erro: "Id inválido" });
        return;
      }
      const AlterVaccinatedNow = new AlterVaccinated(
        new PetshopRepositoryPrisma()
      );
      const vaccinatedPet: DtoVaccianted= {
        id: id,
        vaccinated:true,
        cnpj: cnpjPetshop,
      };
      const isVaccinated = await AlterVaccinatedNow.execute(vaccinatedPet);
      console.log(isVaccinated, "isvacinade");
      if (isVaccinated.length === 0) {
        res.status(404).json({ erro: "Pet Não existe" });
        return;
      }
      res.status(200).json(isVaccinated);
    } catch (error: any) {
      console.error("Erro na edião de vacinação do pets:", error.message);
      return res
        .status(404)
        .json({ erro: "Erro desconhecido no alter vacinated" });
    }
  }
}
