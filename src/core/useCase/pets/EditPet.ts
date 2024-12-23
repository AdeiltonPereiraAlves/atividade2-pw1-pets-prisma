import Pet from "../../model/Pet";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";

export default class EditPet{
    constructor(private petDB: PetshopPrismaPort){}
    edit(cnpj:string,idPet:string, data:Partial<Pet>){
        return this.petDB.editPet(cnpj,idPet, data)
    }
}