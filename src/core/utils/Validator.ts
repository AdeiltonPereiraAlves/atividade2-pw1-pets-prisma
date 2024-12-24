import arrayPetshop from "../../adapters/db/ArrayPetshop";
import Erros from "../constants/Erros";

export default class Validator {
  static validateCnpj(cnpj: string ): boolean {
    const regex: RegExp = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    return regex.test(cnpj);
  }
  static existsPetshop(cnpj: string):boolean{
    const equals: boolean = arrayPetshop.some(
      (petshop) => petshop.cnpj === cnpj
    );

    return equals;
  }
  static validateId(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id)
  }
  static naoNulo(valor:any, erro: string): string| null{
       return valor !==null && valor !== undefined? null: erro
  }
  static validarNome(valor:any){
     

       const nomeRegex = /^[a-zA-ZÀ-ÿ\s]{3,15}$/;
       return nomeRegex.test(valor)
    
  }
}