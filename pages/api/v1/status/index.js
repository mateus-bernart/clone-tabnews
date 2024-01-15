function status(request, response) {
  response.status(200).json({ chave: "sao acima da média" });
}

export default status;
