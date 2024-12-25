import Pet from "../../model/Pet";
import PetshopPort from "../../ports/PetshopPort";
import PetshopPrismaPort from "../../ports/PetshopPrismaPort";
import UseCase from "../../shared/UseCase";
export type DtoDelete = {
    id: string
    cnpj:string,
}
export default class DeletePet implements UseCase<DtoDelete, Pet[]>{
    constructor(private petshopDb: PetshopPrismaPort){}
    async execute(dto: DtoDelete):Promise<Pet[]>{
        const petDelet = {
           id: dto.id,
           cnpj: dto.cnpj
        }
          return this.petshopDb.deletePet(petDelet)
    }
}