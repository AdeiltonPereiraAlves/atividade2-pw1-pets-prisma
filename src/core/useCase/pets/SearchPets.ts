import PetshopResitoryPrisma from "../../../adapters/db/PetshopRepositoryPrisma";
import Erros from "../../constants/Erros";
import UseCase from "../../shared/UseCase";

export type petsFoundsResponse = {
    sucess?: boolean
    message?:string
    dados?:any
}
type Dto = {
    id: string
}
export default class SeachPets implements UseCase<Dto, petsFoundsResponse>{
    constructor(private petshopDb: PetshopResitoryPrisma ){}

    async execute(dto: Dto):Promise<petsFoundsResponse>{
        if(!dto.id){
            return {sucess:false,message:Erros.ID_INVALIDO}
        }
        return {dados: await this.petshopDb.seachPets(dto.id)}
    }
}