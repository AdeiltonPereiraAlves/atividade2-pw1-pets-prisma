import { Pet } from "@prisma/client";
import Petshop from "../model/Petshop";
import { RegisterPetshopResponse } from "../useCase/Petshop/RegisterPetshop";

export default interface PetshopPrismaPort{
    insertPetshop(petshop:Partial<Petshop>): Promise<void>
    insertPet( pet:Partial<Pet>):Promise<Pet >
    existCnpj(cnp:string):Promise<Petshop>
    seachPets(id:string):Promise<Pet[]>
    editPet(pet:Partial<Pet>):Promise<any | Pet>
    alterVaccinated(vacccinatedPert:any):Promise<Pet>;
    deletePet(petDelete: any):Promise<Pet[]| any>
    seachPetshop(cpj:string): any
    existPetId(id:string): any
    seachPetId(pets:Pet [], id: string): any
   

}