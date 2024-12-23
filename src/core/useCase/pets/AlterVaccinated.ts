import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";

export default class AlterVaccinated {
  constructor(private petshopDb: PetshopPrismaPort) {}

  alter(id: string, vaccinated: boolean) {
    return this.petshopDb.alterVaccinated(id, vaccinated);
  }
}
