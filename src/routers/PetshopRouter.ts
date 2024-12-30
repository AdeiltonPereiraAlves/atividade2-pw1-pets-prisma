import { Router, Response, Request } from "express";
// import petshopController from '../controllers/InsertPetshopController'
import { checkExistsUserAccount } from "../core/middleware/checkExistsUserAccount";
import PetshopController from "../controllers/InsertPetshopController";
import RegisterPetshop from "../core/useCase/Petshop/RegisterPetshop";
import PetshopResitoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
const router = Router();
const petshopController = new PetshopController(
  new RegisterPetshop(new PetshopResitoryPrisma())
);
router.post("/", async (req: Request, res: Response) =>
 await petshopController.insert(req, res)
);

export default router;
