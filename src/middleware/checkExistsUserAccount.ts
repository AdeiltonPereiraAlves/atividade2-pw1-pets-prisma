import { NextFunction, Request, Response } from "express";
import Validador from "../utils/Validator";
import PetshopRepository from "../adapters/db/PetshopRepository";
import PetshopRepositoryPrisma from "../adapters/db/PetshopRepositoryPrisma";
import Validator from "../utils/Validator";

declare global {
  namespace Express {
    interface Request {
      petshop?: any;
    }
  }
}
async function checkExistsUserAccount(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<NextFunction | any> {
  try {
    const cnpj = req.headers["cnpj"] as string;
    console.log(cnpj);
    // const exists = await Validador.existsPetshop(cnpj);
    // if (exists) {
    // const novoPetshop = arrayPetshop.find((petshop) => petshop.cnpj === cnpj);
    const validateCnpj = Validator.validateCnpj(cnpj)
    
    if (!validateCnpj) {
      return res.status(400).json({ erro: "CNPJ inválido" });
    }

    const exitsPetshop = new PetshopRepositoryPrisma();
    const newPetshop = await exitsPetshop.existCnpj(cnpj);
    console.log(newPetshop);

    if (newPetshop) {
      req.petshop = newPetshop;

      return next();
    } else {
      res.status(404).json({ erro: "Cnpj não encontrado" });
    }
  } catch (error) {
    return res.status(403).json({ mensagem: "Erro interno do servidor" });
  }
}
export { checkExistsUserAccount };
