import Pet from "../../core/model/Pet";
import Petshop from "../../core/model/Petshop";
import PetsPort from "../../core/ports/PetsPort";

export default class PismaDb implements PetsPort, PetsPort {
    seachPet(cnpj: string, id: string): Pet | null {
        throw new Error("Method not implemented.");
    }
    seachPets(petshop: Petshop): Pet[] | null {
        throw new Error("Method not implemented.");
    }
    editPet(cnpj: string, pet: Pet): void {
        throw new Error("Method not implemented.");
    }
    insertPet(cnpj: string, pet: Pet): void {
        throw new Error("Method not implemented.");
    }
    alterVaccinated(cnpj: string, id: string): Pet {
        throw new Error("Method not implemented.");
    }
    deletePet(cnpj: string, id: string): Pet[] {
        throw new Error("Method not implemented.");
    }

}