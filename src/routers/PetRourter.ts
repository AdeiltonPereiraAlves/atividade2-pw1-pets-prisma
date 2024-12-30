import { Router } from "express";
import SeachPetsController from "../controllers/SeachPetsController";
import { checkExistsUserAccount } from "../core/middleware/checkExistsUserAccount";
import InsertPetController from "../controllers/InsertPetController";
import EditPetController from "../controllers/EditPetController";
import AlterVaccinatedController from "../controllers/AlterVaccinatedController";
import DeletePetController  from "../controllers/DeletePetController"
import RegisterPet from "../core/useCase/pets/RegisterPet";
import PetshopResitoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
import SeachPets from "../core/useCase/pets/SearchPets";
import EditPet from "../core/useCase/pets/EditPet";
import AlterVaccinated from "../core/useCase/pets/AlterVaccinated";
import DeletePet from "../core/useCase/pets/DeletePet";


const deletePet = new DeletePetController( new DeletePet(new PetshopResitoryPrisma))
const alterVaccinated = new AlterVaccinatedController( new AlterVaccinated(new PetshopResitoryPrisma))
const editPet = new  EditPetController(new EditPet(new PetshopResitoryPrisma))
const seachPets = new SeachPetsController(new SeachPets(new PetshopResitoryPrisma))
const insertPet = new InsertPetController(new RegisterPet(new PetshopResitoryPrisma))

const router = Router();
router.get("/pets", checkExistsUserAccount, async (req, res) =>  await seachPets.seachPets(req, res ));
router.post("/pets", checkExistsUserAccount,async (req, res) => await  insertPet.insert(req, res));
router.put("/pets/:id", checkExistsUserAccount,async (req, res) => await editPet.edit(req, res));
router.patch("/pets/:id", checkExistsUserAccount, async (req, res) => await alterVaccinated.Alter(req, res));
router.delete("/pets/:id", checkExistsUserAccount, async (req, res) => await deletePet.delete(req, res));

export default router;
