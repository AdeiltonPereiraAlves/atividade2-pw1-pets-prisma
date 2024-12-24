import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";

export default class AlterVaccinated {
  constructor(private petshopDb: PetshopPrismaPort) {}

  alter(idPet: string, cnpj:string, vaccinated: boolean) {
    return this.petshopDb.alterVaccinated(idPet,cnpj,vaccinated);
  }
}
