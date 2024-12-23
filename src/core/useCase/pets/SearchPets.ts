import PetshopResitoryPrisma from "../../../adapters/db/PetshopRepositoryPrisma";
import Petshop from "../../model/Petshop";
import PetshopPort from "../../ports/PetshopPort";

export default class SeachPets{
    constructor(private petshopDb: PetshopResitoryPrisma ){}

    seach(id: string | undefined){
        if(!id){
            return false
        }
        return this.petshopDb.seachPets(id);
    }
}