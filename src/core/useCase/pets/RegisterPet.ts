import Pet from "../../model/Pet";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";
import Id from "../../shared/Id";
import UseCase from "../../shared/UseCase";

export type DtoRegisterPet = {
  name: string;
  type: string;
  description: string;
  deadline_vaccination: Date;
  petshopId: string;
};

export default class RegisterPet implements UseCase<DtoRegisterPet, Pet> {
  constructor(private petsDB: PetshopPrismaPort) {}
  async execute(dto: DtoRegisterPet): Promise<Pet> {
    const pet: Partial<Pet> = {
      id: Id.gerar(),
      name: dto.name,
      type: dto.type,
      description: dto.description,
      vaccinated: false,
      deadline_vaccination: new Date(dto.deadline_vaccination),
      created_at: new Date(),
      petshopId: dto.petshopId,
    };
    return this.petsDB.insertPet(pet);
  }
}
