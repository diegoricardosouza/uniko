import { create } from "./create";
import { getAll } from "./getAll";
import { getAllPaginate } from "./getAllPaginate";
import { getById } from "./getById";
import { getBySlug } from "./getBySlug";
import { getRelated } from "./getRelated";
import { remove } from "./remove";
import { update } from "./update";

export const postsService = {
  getAll,
  getAllPaginate,
  remove,
  create,
  getById,
  getBySlug,
  getRelated,
  update
}