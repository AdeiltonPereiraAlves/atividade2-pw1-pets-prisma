import { Pet } from "@prisma/client";
import Petshop from "../model/Petshop";

export default interface PetshopPrismaPort{
    insertPetshop(petshop:Partial<Petshop>): Promise<Petshop| boolean>
    insertPet( pet:Pet):Promise<Pet | any>
    existCnpj(cnp:string):any
    seachPets(id:string) :any
    editPet(pet:Pet): any
    alterVaccinated(vacccinatedPert:any):Promise<Pet| any>;
    deletePet(cnpj:string, id: string):Promise<Pet[]| any>
    seachPetshop(cpj:string): any
   

}