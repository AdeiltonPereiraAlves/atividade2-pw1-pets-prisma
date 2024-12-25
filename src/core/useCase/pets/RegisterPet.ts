import Erros from "../../constants/Erros";
import Pet from "../../model/Pet";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";
import Id from "../../shared/Id";
import UseCase from "../../shared/UseCase";

export type Dto = {
  name: string;
  type: string;
  description: string;
  deadline_vaccination: Date;
 
  petshopId:string 
};

export default class RegisterPet implements UseCase<Dto, Pet> {
  constructor(private petsDB: PetshopPrismaPort) {}
  async execute(dto: Dto):Promise<Pet> {
   
    const pet:Pet | any= {
      id: Id.gerar(),
      name: dto.name,
      type: dto.type,
      description: dto.description,
      vaccinated: false,
      deadline_vaccination: new Date(dto.deadline_vaccination),
      created_at: new Date(),
      petshopId: dto.petshopId
      
    };
    return this.petsDB.insertPet(pet);
  }
}
