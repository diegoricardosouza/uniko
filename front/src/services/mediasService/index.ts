import { create } from "./create";
import { getAll } from "./getAll";
import { getById } from "./getById";
import { getByName } from "./getByName";
import { remove } from "./remove";
import { update } from "./update";

export const mediasService = {
  getAll,
  remove,
  create,
  getById,
  getByName,
  update
}