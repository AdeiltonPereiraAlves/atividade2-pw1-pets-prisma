import { Pet } from "@prisma/client";
import Petshop from "../model/Petshop";

export default interface PetshopPrismaPort{
    insertPetshop(petshop:Partial<Petshop>): Promise<Petshop| boolean>
    insertPet( pet:Pet):Promise<Pet | any>
    existCnpj(cnp:string):any
    seachPets(id:string) :any
    editPet(cnpj:string,idPet: string, data:Partial<Pet>): any
    alterVaccinated(idPet: string,cnpj:string, vaccinated:boolean):Promise<Pet[]>;
    deletePet(cnpj:string, id: string):Promise<Pet[]| any>
    seachPetshop(cpj:string): any
   

}