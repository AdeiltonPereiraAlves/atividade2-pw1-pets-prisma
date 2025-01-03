import { NextFunction, Request, Response } from "express";

import PetshopRepositoryPrisma from "../../adapters/db/PetshopRepositoryPrisma";
import Validator from "../utils/Validator";
import Erros from "../constants/Erros";

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
   
    const validateCnpj = Validator.validateCnpj(cnpj)
    
    if (!validateCnpj) {
      return res.status(400).json({ error: Erros.CNPJ_INVALIDO });
    }

    const exitsPetshop = new PetshopRepositoryPrisma();
    const newPetshop = await exitsPetshop.seachPetshop(cnpj);
    console.log(newPetshop);
   
    if (newPetshop) {
      req.petshop = newPetshop;

      return next();
    } else {
      res.status(400).json({ error: Erros.CNPJ_NAO_EXISTE });
    }
  } catch (error) {
    return res.status(403).json({ mensagem: "Erro interno do servidor" });
  }
}
export { checkExistsUserAccount };
