import Pet from "../../model/Pet";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";
import UseCase from "../../shared/UseCase";

export type Dto = {
  id: string;
  cnpj: string;
};
export default class AlterVaccinated implements UseCase<Dto, Pet> {
  constructor(private petshopDb: PetshopPrismaPort) {}
  async execute(dto: Dto): Promise<Pet | any> {
    const petVaccinated = {
      id: dto.id,
      vaccinated: true,
      cnpj: dto.cnpj,
    };
    const pet = await this.petshopDb.alterVaccinated(petVaccinated);
    return pet;
  }
}
