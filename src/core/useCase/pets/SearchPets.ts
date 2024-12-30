import PetshopResitoryPrisma from "../../../adapters/db/PetshopRepositoryPrisma";
import Erros from "../../constants/Erros";
import Pet from "../../model/Pet";
import Petshop from "../../model/Petshop";
import PetshopPort from "../../ports/PetshopPort";

export default class SeachPets{
    constructor(private petshopDb: PetshopResitoryPrisma ){}

    async seach(id: string ):Promise<Pet[]|string>{
        if(!id){
            return Erros.ID_INVALIDO
        }
        return this.petshopDb.seachPets(id);
    }
}