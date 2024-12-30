import { Pet, PrismaClient } from "@prisma/client";
import Petshop from "../../core/model/Petshop";
import PetshopPrismaPort from "../../core/ports/PetshopPrismaPort";
import { DtoDelete } from "../../core/useCase/pets/DeletePet";
import { DtoVaccianted } from "../../core/useCase/pets/AlterVaccinated";
import Erros from "../../core/constants/Erros";
import prismaDb from "./Prisma";
export default class PetshopResitoryPrisma implements PetshopPrismaPort {
  
  constructor() {
  }
  async deletePet(petDelet: DtoDelete): Promise<Pet[] | any> {
    try {
      const { id, cnpj } = petDelet;
      console.log(id, "id");
      const petShop = await this.seachPetshop(cnpj);
      const valideId = await this.seachPetId(petShop.pets, id);
      console.log(valideId, "valide id");
      if (valideId.length === 0) {
        return Erros.ID_INEXISTENTE;
      }
      const isPetDelete = await prismaDb.pet.deleteMany({
        where: { id: id, petshopId: petShop.id },
      });
      console.log(isPetDelete);
      if (isPetDelete) {
        const pets = await this.seachPets(petShop.id);
        console.log(pets, "array de pets aqui no banco");
        return pets;
      }
    } catch (error) {
      throw new Error("erro ao deletar pet.");
    }
  }
  async alterVaccinated(petVaccinated: DtoVaccianted): Promise<Pet | any> {
    try {
      const { id, vaccinated, cnpj } = petVaccinated;
      console.log(id, "idpetpet");
      const petShop = await this.seachPetshop(cnpj);
      if (!petShop.id) {
        throw new Error("Erro ao mudar vaccinated para true.");
      }
      const isPetUpdate = await prismaDb.pet.updateMany({
        where: { id: id, petshopId: petShop.id },
        data: { vaccinated },
      });
      console.log(isPetUpdate, "ispetupdate");
      if (isPetUpdate) {
        console.log(isPetUpdate, "ispetupdate");

        const pets = await this.seachPets(petShop.id);
        console.log(pets, "pets");
        console.log(id, "idpet");
        const newPet = await this.seachPetId(pets, id);
        console.log(newPet, "new pet");
        return newPet;
      }
    } catch (error) {
      throw new Error("Erro ao mudar vaccinated para true.");
    }
  }

  async seachPetshop(cnpj: string) {
    const petshop = await prismaDb.petshop.findUnique({
      where: { cnpj: cnpj },
      include: { pets: true },
    });
    if (!petshop) {
      throw new Error(`Nenhum petshop encontrado com o CNPJ: ${cnpj}`);
    }
    return petshop;
  }
  async insertPet(pet: Pet): Promise<Pet | any> {
    try {
      let {
        id,
        name,
        type,
        description,
        vaccinated,
        deadline_vaccination,
        created_at,
        petshopId,
      } = pet;

      const newPet = await prismaDb.pet.create({
        data: {
          id,
          name,
          type,
          description,
          vaccinated,
          deadline_vaccination,
          created_at,
          petshopId,
        },
      });

      return newPet;
    } catch (error) {
      console.log("Erro ao inserir pet:", error);
      throw new Error("erro ao inserir pet.");
    }
  }
  async existCnpj(cnpj: string): Promise<boolean | any> {
    try {
      const isTrue = await prismaDb.petshop.findUnique({
        where: { cnpj: cnpj },
      });
      console.log(isTrue, "Existte cnpj");
      return isTrue;
    } catch (error) {
      throw new Error("erro no existcnpj");
    }
  }

  async insertPetshop(petshop: Petshop): Promise<Petshop | any> {
    let { name, cnpj} = petshop as any ;
    console.log(name, cnpj, "name e cnpj no banco");
  
    const petShop:Petshop = await prismaDb.petshop.create({
      data: { name, cnpj},
    });
    console.log(petShop,"petshop banco")
    return petShop;
  }

  async seachPets(id: string) {
    try {
      const pets = await prismaDb.pet.findMany({
        where: { petshopId: id },
      });

      console.log(pets);

      return pets;
    } catch (error) {
      console.log(error);
      throw new Error("erro procurar pets");
    }
  }
  async seachPetId(pets: Pet[], id: string) {
    try {
      const petFound = pets.filter((pet: Pet) => pet.id === id);
      return petFound;
    } catch (error) {
      throw new Error("Pet não encontrado");
    }
  }
 // criando novo metodo que retorana o id de um pet
  async existPetId(id:string){
    try {
      const exist = await prismaDb.pet.findUnique({where: {id: id}})
      return exist
    } catch (error) {
      throw new Error("Pet não encontrado");
    }
  }
  //---------------------------------------------
  async editPet(pet: any) {
    let {
      id,
      name,
      type,
      description,

      deadline_vaccination,
       petshoId,
      cnpj,
    } = pet;

  
    try {
    

      const editePet = await prismaDb.pet.updateMany({
        where: { id: id, petshopId: petshoId},
        data: {name, type, description, deadline_vaccination},
      });
      if (editePet) {
        const pets = await this.seachPets(petshoId);
        const newPet = await this.seachPetId(pets, id);
        return newPet;
      }
    } catch (error) {
      throw new Error("erro peditar pets");
    }
  }
}
