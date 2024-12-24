import Validator from "../../utils/Validator";
import Erros from "../../constants/Erros";
import Petshop from "../../model/Petshop";

import PetshopPrismaPort from "../../ports/PetshopPrismaPort";
import UseCase from "../../shared/UseCase";
import { Pet } from "@prisma/client";
import Id from "../../shared/Id";

export type Dto = {name: string, cnpj:string, pets:Pet[]}
export default class RegisterPetshop implements UseCase<Dto, Petshop| boolean | string>{
    constructor(private petshopDb: PetshopPrismaPort){

    }
    async execute(dto: Dto):Promise<Petshop| boolean | string >{
     
       
        if(!Validator.validarNome(dto.name)){
            return Erros.NOME_INVALIDO
        }

        if(!dto.cnpj){
            return Erros.CNPJ_IMCOMPELTO
        }
        if(!Validator.validateCnpj(dto.cnpj)) return Erros.CNPJ_INVALIDO
        
        const petshop: Petshop ={
            id: Id.gerar(),
            name: dto.name,
            cnpj: dto.cnpj,
            pets: []
        }
        const isTrue = await this.petshopDb.existCnpj(petshop.cnpj)
        if(!isTrue){
            petshop.pets?[...petshop.pets]: []
            return this.petshopDb.insertPetshop(petshop)
        }
        return false
    }

}