export default function status(request, response) {
  return response.status(200).json({ chave: "valor" });
}
