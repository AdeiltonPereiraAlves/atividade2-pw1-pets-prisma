import Pet from "../../model/Pet";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";
import UseCase from "../../shared/UseCase";
export  type Dto = {
        id:string
        name: string;
        type: string;
        description: string;
        deadline_vaccination: Date;
       
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
           
            cnpj: dto.cnpj
        }
       console.log(pet, "pet no usecase")
        return this.petDB.editPet(pet)
    }
}