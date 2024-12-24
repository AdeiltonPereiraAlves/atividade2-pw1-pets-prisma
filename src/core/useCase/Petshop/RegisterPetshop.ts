import Validator from "../../utils/Validator";
import Erros from "../../constants/Erros";
import Petshop from "../../model/Petshop";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";

export default class RegisterPetshop{
    constructor(private petshopDb: PetshopPrismaPort){

    }
    async execute(petshop: Partial<Petshop>):Promise<any>{
        const petShopNulo = Validator.naoNulo(petshop, Erros.PETSHOP_INVALIDO)
        if(petShopNulo){
            return petShopNulo
        }
       
        if(!Validator.validarNome(petshop.name)){
            return Erros.NOME_INVALIDO
        }

        if(!petshop.cnpj){
            return Erros.CNPJ_IMCOMPELTO
        }
        if(!Validator.validateCnpj(petshop.cnpj)) return Erros.CNPJ_INVALIDO

        const isTrue = await this.petshopDb.existCnpj(petshop.cnpj)
        if(!isTrue){
            petshop.pets?[...petshop.pets]: []
            return this.petshopDb.insertPetshop(petshop)
        }
    }

}