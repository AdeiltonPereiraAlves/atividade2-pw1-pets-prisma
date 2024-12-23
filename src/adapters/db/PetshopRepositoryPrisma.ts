import { Pet, PrismaClient } from "@prisma/client";
import Petshop from "../../core/model/Petshop";
import PetshopPrismaPort from "../../core/ports/PetshopPrismaPort";
import Id from "../../core/shared/Id";

export default class PetshopResitoryPrisma implements PetshopPrismaPort {
  private prismaDb: PrismaClient;
  constructor() {
    this.prismaDb = new PrismaClient();
  }
  async alterVaccinated( id: string, vaccinated: boolean):Promise<Pet| any> {
    try {
      const pet:Pet =  await this.prismaDb.pet.update({where: {id: id}, data: {vaccinated}})
      return pet
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
       const existsPetshop = await this.seachPetshop(cnpj)
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
            petshopId:id,
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
  async insertPetshop(petshop: Petshop): Promise<Petshop | any> {
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
  async seachPets(id: string){
     try {
       
      const pets= await this.prismaDb.pet.findMany({where: {petshopId: id}})
     
      console.log(pets)
      
        return pets
      
     } catch (error) {
      console.log(error);
      throw new Error("erro procurar pets");
     }

  }
  
  async editPet( idPet:string,dataUpDate:Partial<Pet>){
      try {
        const editePet = await this.prismaDb.pet.update({where: {id: idPet}, data: dataUpDate})
        return editePet
      } catch (error) {
        throw new Error("erro peditar pets");
      }
  }
  
}
