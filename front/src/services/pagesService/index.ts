import { create } from "./create";
import { getAll } from "./getAll";
import { getById } from "./getById";
import { getBySlug } from "./getBySlug";
import { remove } from "./remove";
import { update } from "./update";

export const pagesService = {
  getAll,
  remove,
  create,
  getById,
  update,
  getBySlug
}