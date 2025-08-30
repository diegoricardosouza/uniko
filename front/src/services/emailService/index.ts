import { getAll } from "./getAll";
import { getById } from "./getById";
import { remove } from "./remove";
import { send } from "./send";

export const emailService = {
  getAll,
  remove,
  send,
  getById
}