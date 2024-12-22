import { Pet, PrismaClient } from "@prisma/client";
import Petshop from "../../core/model/Petshop";
import PetshopPrismaPort from "../../core/ports/PetshopPrismaPort";

export default class PetshopResitoryPrisma implements PetshopPrismaPort {
  private prismaDb: PrismaClient;
  constructor() {
    this.prismaDb = new PrismaClient();
  }
  async insertPet(cnpj: string, pet: any): Promise<Pet | any> {
    console.log(cnpj, pet, "Pet e cnpj");
    try {
      const petshopPets = await this.prismaDb.petshop.findUnique({
        where: { cnpj: cnpj },
        include: { pets: true },
      });

      console.log(petshopPets, "petshopPets");
     let {
        name,
        type,
        description,
        vaccinated,
        deadline_vaccination,
        created_at,
      } = pet;
      console.log("Dados para criação do pet:", {
        name,
        type,
        description,
        vaccinated,
        deadline_vaccination,
        created_at,
        petshopId: petshopPets.id,
      });
      const deadlineDate = new Date(deadline_vaccination);
      
     
      if (petshopPets) {
        console.log(petshopPets, "dontro do if");
        const newPet = await this.prismaDb.pet.create({
          data: {
            name,
            type,
            description,
            vaccinated,
            deadline_vaccination:deadlineDate,
            created_at,
            petshopId: petshopPets.id,
          },
        });

        console.log(newPet, "newPet");
        return newPet;
      } else {
        console.log("deu erro");
      }
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
  async insert(petshop: Petshop): Promise<Petshop | any> {
    try {
      let { name, cnpj, pets } = petshop as any;
      console.log(name, cnpj, pets);
      const isTrue = await this.existCnpj(cnpj);
      console.log(isTrue, "istrue");
      if (!isTrue) {
        pets ? [...pets] : [];

        const petShop = await this.prismaDb.petshop.create({
          data: { name, cnpj },
        });
        return petShop;
      } else {
        throw new Error("Cnpj já existe");
      }
    } catch (error: any) {
      console.log(error);
      throw new Error("erro ao criar petShop");
    }
  }
}
