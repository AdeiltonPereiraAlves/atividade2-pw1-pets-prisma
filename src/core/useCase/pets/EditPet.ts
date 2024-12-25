import Pet from "../../model/Pet";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";
import UseCase from "../../shared/UseCase";
export default interface Dto  {
        id:string
        name: string;
        type: string;
        description: string;
        deadline_vaccination: Date;
        petshopId:string,
        cnpj:string
      
}
export default class EditPet implements UseCase<Dto,Pet>{
    constructor(private petDB: PetshopPrismaPort){}
    execute(dto:Dto){
        const pet:any= {
            id: dto.id,
            name: dto.name,
            type: dto.type,
            description: dto.description,
            deadline_vaccination:dto.deadline_vaccination,
            petshopId: dto.petshopId,
            cnpj: dto.cnpj
        }
       console.log(pet, "pet no usecase")
        return this.petDB.editPet(pet)
    }
}