import { ChatGPTAPI } from "chatgpt";

export const getAIMetaTitleAndDescription = async (
  product_name: string,
  product_description: string,
  product_category: string
) => {
  const chatgpt = new ChatGPTAPI({
    apiKey: "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",
  });
  const res = await chatgpt.sendMessage(`
      Dame un titulo optimizado para SEO en google, empezando con el nombre de la marca, producto categoria ${product_category}, maximo 55 caracteres
      nombre: ${product_name}
    `);
  const meta_title = res.text.replaceAll('"', "");

  const res2 = await chatgpt.sendMessage(`
      Dame una descripción optimizada para SEO en google, producto categoria ${product_category}, maximo 160 caracteres
      nombre: ${product_name}
      descripción: ${product_description}
    `);
  const meta_description = res2.text.replaceAll('"', "");

  return {
    meta_title,
    meta_description,
  };
};
