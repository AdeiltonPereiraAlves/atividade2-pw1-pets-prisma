import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";

export default class DeletePet{
    constructor(private petshopDb: PetshopPrismaPort){}
    delete(cnpj:string, id:string){
          return this.petshopDb.deletePet(cnpj, id)
    }
}