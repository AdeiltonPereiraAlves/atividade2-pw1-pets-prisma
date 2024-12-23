import Pet from "../../model/Pet";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";

export default class RegisterPet{
    constructor(private petsDB:PetshopPrismaPort){}
    execute(cnpj: string, pet: any){
        return this.petsDB.insertPet(cnpj,pet)
    }
}