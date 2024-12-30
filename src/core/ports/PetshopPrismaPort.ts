import { Pet } from "@prisma/client";
import Petshop from "../model/Petshop";
import { RegisterPetshopResponse } from "../useCase/Petshop/RegisterPetshop";

export default interface PetshopPrismaPort{
    insertPetshop(petshop:Partial<Petshop>): Promise<RegisterPetshopResponse>
    insertPet( pet:Partial<Pet>):Promise<Pet | any>
    existCnpj(cnp:string):any
    seachPets(id:string) :any
    editPet(pet:Pet): any
    alterVaccinated(vacccinatedPert:any):Promise<Pet| any>;
    deletePet(petDelete: any):Promise<Pet[]| any>
    seachPetshop(cpj:string): any
    existPetId(id:string): any
    seachPetId(pets:Pet [], id: string): any
   

}