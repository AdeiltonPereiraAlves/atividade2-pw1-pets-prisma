import { Pet, PrismaClient } from "@prisma/client";
import Petshop from "../../core/model/Petshop";
import PetshopPrismaPort from "../../core/ports/PetshopPrismaPort";
import Id from "../../core/shared/Id";

export default class PetshopResitoryPrisma implements PetshopPrismaPort {
  private prismaDb: PrismaClient;
  constructor() {
    this.prismaDb = new PrismaClient();
  }
  async deletePet(cnpj: string, idPet: string):Promise<Pet[]|any> {
    try {
       const petShop = await this.seachPetshop(cnpj)
       const isPetDelete = await this.prismaDb.pet.deleteMany({where: { id: idPet, petshopId: petShop.id}})
       console.log(isPetDelete)
       if(isPetDelete){
           const pets = await this.seachPets(petShop.id)
           console.log(pets,"array de pets aqui no banco")
           return pets
       }

    } catch (error) {
      throw new Error("erro ao deletar pet.");
    }
    
  }
  async alterVaccinated(idPet: string,cnpj:string, vaccinated: boolean): Promise<Pet | any> {
    try {
      const petShop = await this.seachPetshop(cnpj)
      if(!petShop.id){
        throw new Error("Erro ao mudar vaccinated para true.");
      }
      const isPetUpdate= await this.prismaDb.pet.updateMany({
        where: { id: idPet , petshopId: petShop.id },
        data: { vaccinated },
      });
      console.log(isPetUpdate, "ispetupdate")
      if (isPetUpdate) {
        const pets = await this.seachPets(petShop.id);
        const newPet = await this.seachPetId(pets, idPet);
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
  async insertPet(cnpj: string, pet: any): Promise<Pet | any> {
    try {
      const existsPetshop = await this.seachPetshop(cnpj);
      const id = existsPetshop.id;
      console.log(existsPetshop, "existpetshop");
      let {
        name,
        type,
        description,
        vaccinated,
        deadline_vaccination,
        created_at,
      } = pet;

      const deadlineDate = new Date(deadline_vaccination);

      if (existsPetshop) {
        console.log(existsPetshop, "dontro do if");
        const newPet = await this.prismaDb.pet.create({
          data: {
            id: Id.gerar(),
            name,
            type,
            description,
            vaccinated,
            deadline_vaccination: deadlineDate,
            created_at,
            petshopId: id,
          },
        });

        return newPet;
      } else {
        throw new Error("Não exite esse petshop");
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

  // refatorando ----------------------
  async insertPetshop(petshop: Petshop): Promise<Petshop | any> {
  
      let { name, cnpj} = petshop as any;
      console.log(name, cnpj, "name e cnpj no banco");
      
    
        const petShop = await this.prismaDb.petshop.create({
          data: { name, cnpj },
        });
        return petShop;
     
   
    
  }
  //fim-----------------------------------------
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

  async editPet(cnpj: string, idPet: string, dataUpDate: Partial<Pet>) {
    try {
     
      const petshop = await this.seachPetshop(cnpj);
      if (!petshop) {
        throw new Error("erro editar pets");
      }
      const idPetShop = petshop.id;
      if (!idPetShop) {
        throw new Error("erro procurar pets");
      }
      console.log(petshop, idPet, "id e petshop no banco");
      const editePet = await this.prismaDb.pet.updateMany({
        where: { id: idPet, petshopId: idPetShop },
        data: dataUpDate,
      });
      if (editePet) {
        const pets = await this.seachPets(idPetShop);
        const newPet = await this.seachPetId(pets, idPet);
        return newPet;
      }
     
    } catch (error) {
      throw new Error("erro peditar pets");
    }
  }
}
