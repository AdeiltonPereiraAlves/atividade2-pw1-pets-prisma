import Petshop from "../../model/Petshop";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";

export default class RegisterPetshop{
    constructor(private petshopDb: PetshopPrismaPort){

    }
    execute(petshop: Partial<Petshop>){
       return this.petshopDb.insertPetshop(petshop)
    }

}