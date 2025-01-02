import Validator from "../../utils/Validator";
import Erros from "../../constants/Erros";
import Petshop from "../../model/Petshop";

import PetshopPrismaPort from "../../ports/PetshopPrismaPort";
import UseCase from "../../shared/UseCase";
import { Pet } from "@prisma/client";
import Id from "../../shared/Id";

export type Dto = { name: string; cnpj: string; pets: Pet[] };
export type RegisterPetshopResponse = {
  sucess: boolean;
  message?: string;
  data?:any;
};
export default class RegisterPetshop implements UseCase<Dto, RegisterPetshopResponse> {
  constructor(private petshopDb: PetshopPrismaPort) {}
  async execute(dto: Dto): Promise<RegisterPetshopResponse> {
    if (!Validator.validarNome(dto.name)) {
      return { sucess: false, message: Erros.NOME_INVALIDO };
    }

    if (!dto.cnpj) {
      return { sucess: false, message: Erros.CNPJ_NAO_EXISTE };
    }
    if (!Validator.validateCnpj(dto.cnpj)){

        return { sucess: false, message: Erros.CNPJ_INVALIDO };
    }

    const petshop: Petshop = {
      id: Id.gerar(),
      name: dto.name,
      cnpj: dto.cnpj,
      pets: [],
    };
    console.log(petshop.cnpj)
    const isTrue = await this.petshopDb.existCnpj(petshop.cnpj);
    console.log(isTrue,"istrue")
    if (!isTrue) {
   
      const newPetshop = await this.petshopDb.insertPetshop(petshop);
      newPetshop.pets = []
      return {sucess: true, message: "Petshop cadastrado com sucesso", data: newPetshop}
    }
    return {sucess: false, message: Erros.CNPJ_JA_EXISTE};
  }
}
