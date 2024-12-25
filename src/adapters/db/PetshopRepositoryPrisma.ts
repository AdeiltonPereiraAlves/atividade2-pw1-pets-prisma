import { Pet, PrismaClient } from "@prisma/client";
import Petshop from "../../core/model/Petshop";
import PetshopPrismaPort from "../../core/ports/PetshopPrismaPort";

export default class PetshopResitoryPrisma implements PetshopPrismaPort {
  private prismaDb: PrismaClient;
  constructor() {
    this.prismaDb = new PrismaClient();
  }
  async deletePet(cnpj: string, idPet: string): Promise<Pet[] | any> {
    try {
      const petShop = await this.seachPetshop(cnpj);
      const isPetDelete = await this.prismaDb.pet.deleteMany({
        where: { id: idPet, petshopId: petShop.id },
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
  async alterVaccinated(petVaccinated: any): Promise<Pet | any> {
    try {
      const { id, vaccinated, cnpj } = petVaccinated;
      console.log(id, "idpetpet");
      const petShop = await this.seachPetshop(cnpj);
      if (!petShop.id) {
        throw new Error("Erro ao mudar vaccinated para true.");
      }
      const isPetUpdate = await this.prismaDb.pet.updateMany({
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
    const petshop = await this.prismaDb.petshop.findUnique({
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

      const newPet = await this.prismaDb.pet.create({
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
      const isTrue = await this.prismaDb.petshop.findUnique({
        where: { cnpj: cnpj },
      });
      console.log(isTrue, "Existte cnpj");
      return isTrue;
    } catch (error) {
      throw new Error("erro no existcnpj");
    }
  }

  async insertPetshop(petshop: Petshop): Promise<Petshop | any> {
    let { name, cnpj } = petshop as any;
    console.log(name, cnpj, "name e cnpj no banco");

    const petShop = await this.prismaDb.petshop.create({
      data: { name, cnpj },
    });
    return petShop;
  }

  async seachPets(id: string) {
    try {
      const pets = await this.prismaDb.pet.findMany({
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
  //---------------------------------------------
  async editPet(pet: any) {
    let {
      id,
      name,
      type,
      description,

      deadline_vaccination,

      cnpj,
    } = pet;
    const dadosPet = {
      name,
      type,
      description,
      deadline_vaccination,
    };

    try {
      const petshop = await this.existCnpj(cnpj);

      if (!petshop) {
        throw new Error("erro editar pets");
      }
      const idPetShop = petshop.id;
      if (!idPetShop) {
        throw new Error("erro procurar pets");
      }

      const editePet = await this.prismaDb.pet.updateMany({
        where: { id: id, petshopId: idPetShop },
        data: dadosPet,
      });
      if (editePet) {
        const pets = await this.seachPets(idPetShop);
        const newPet = await this.seachPetId(pets, id);
        return newPet;
      }
    } catch (error) {
      throw new Error("erro peditar pets");
    }
  }
}
