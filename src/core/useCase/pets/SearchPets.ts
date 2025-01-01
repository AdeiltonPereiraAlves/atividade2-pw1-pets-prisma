import PetshopResitoryPrisma from "../../../adapters/db/PetshopRepositoryPrisma";
import Erros from "../../constants/Erros";

export type petsFoundsResponse = {
    sucess?: boolean
    message?:string
    dados?:any
}
export default class SeachPets{
    constructor(private petshopDb: PetshopResitoryPrisma ){}

    async seach(id: string ):Promise<petsFoundsResponse>{
        if(!id){
            return {sucess:false,message:Erros.ID_INVALIDO}
        }
        return {dados: await this.petshopDb.seachPets(id)}
    }
}