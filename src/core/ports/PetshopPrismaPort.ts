import { Pet } from "@prisma/client";
import Petshop from "../model/Petshop";

export default interface PetshopPrismaPort{
    insertPetshop(petshop:Partial<Petshop>): Promise<void>
    insertPet(cnpj:string, pet:any):Promise<Pet | any>
    existCnpj(cnp:string):any
    seachPets(id:string) :any
    editPet(cnpj:string,idPet: string, data:Partial<Pet>): any
    alterVaccinated(id: string, vaccinated:boolean):Promise<Pet>;
     deletePet(cnpj:string, id: string): Pet[]
   

}