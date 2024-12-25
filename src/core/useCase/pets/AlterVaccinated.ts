import Pet from "../../model/Pet";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";
import UseCase from "../../shared/UseCase";

export type DtoVaccianted = {
  id: string;
  vaccinated:boolean;
  cnpj: string;
};
export default class AlterVaccinated implements UseCase<DtoVaccianted, Pet> {
  constructor(private petshopDb: PetshopPrismaPort) {}
  async execute(dto: DtoVaccianted): Promise<Pet | any> {
    const petVaccinated = {
      id: dto.id,
      vaccinated: dto.vaccinated,
      cnpj: dto.cnpj,
    };
    const pet = await this.petshopDb.alterVaccinated(petVaccinated);
    return pet;
  }
}
