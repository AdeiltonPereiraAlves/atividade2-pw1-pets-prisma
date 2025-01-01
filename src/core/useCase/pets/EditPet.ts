import { promises } from "dns";
import Pet from "../../model/Pet";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";
import UseCase from "../../shared/UseCase";
export  type DtoPetEdite = {
        id:string
        name: string;
        type: string;
        description: string;
        deadline_vaccination: Date;
        petshopId: string
        cnpj:string
      
}
export default class EditPet implements UseCase<DtoPetEdite,Pet >{
    constructor(private petDB: PetshopPrismaPort){}

    async execute(dto:DtoPetEdite):Promise<Pet>{
        const isPetExists = await this.petDB.existPetId(dto.id)
        const petshop = await this.petDB.seachPetshop(dto.cnpj);
        const isPetInPetshop = await this.petDB.seachPetId(petshop.pets,isPetExists.id)
        console.log(petshop.cnpj, dto.cnpj, "dtocnpj")
        if(!isPetExists){
            throw new Error("Pet nao encontrado para editar")
        }
        if(!petshop){
            throw new Error("Petshop nao encontrado")
        }
        if(petshop.cnpj !== dto.cnpj){
            throw new Error("Petshop não encontrado")
        }
        console.log(isPetInPetshop, "ispetpethsiop")
        if(isPetInPetshop.length === 0 ){
            throw new Error("Pet nao encontrado")
        }
        
        const pet= {
            id: dto.id,
            name: dto.name || isPetExists.name,
            type: dto.type || isPetExists.type,
            description: dto.description || isPetExists.description,
            deadline_vaccination:dto.deadline_vaccination || isPetExists.deadline_vaccination,
            petshopId: dto.petshopId? dto.petshopId : petshop.id
           
        }
       console.log(pet, "pet")
        return this.petDB.editPet(pet)
    }
}