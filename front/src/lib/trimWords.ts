export function trimWords(texto: string, limite: number): string {
  const palavras = texto.split(" ");
  return palavras.length > limite
    ? palavras.slice(0, limite).join(" ") + "..."
    : texto;
}

export function trimByCharacters(texto: string, limite: number): string {
  return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
}