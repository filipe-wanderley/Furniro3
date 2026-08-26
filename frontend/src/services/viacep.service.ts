export type ViaCepResponse = {
  erro?: boolean;
  logradouro?: string;
  localidade?: string;
  uf?: string;
};

export const fetchAddressByCep = async (cep: string) => {
  const sanitizedCep = cep.replace(/\D/g, "");
  if (sanitizedCep.length !== 8) return null;
  const response = await fetch(
    `https://viacep.com.br/ws/${sanitizedCep}/json/`,
  );
  if (!response.ok) throw new Error("Unable to fetch address");
  const data = (await response.json()) as ViaCepResponse;
  if (data.erro) throw new Error("ZIP code not found");
  return data;
};
