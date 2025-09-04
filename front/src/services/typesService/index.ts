import { create } from "./create";
import { getAll } from "./getAll";
import { getById } from "./getById";
import { remove } from "./remove";
import { update } from "./update";

export const typesService = {
  getAll,
  remove,
  create,
  getById,
  update
}