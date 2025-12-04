export default async (req, res) => {
  try {
    const { message } = JSON.parse(req.body);

    // URL da API do Google (Gemini)
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=AIzaSyBcx3Z_su5b0vkHAOP3KRw1OJz37KeQn5g";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: { text: message }
      })
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.candidates?.[0]?.output || "Erro: Sem resposta da IA."
    });

  } catch (err) {
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};
