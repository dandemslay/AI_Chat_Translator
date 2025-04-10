// Import Dependence
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

// Load the config  (API KEy)
dotenv.config();

// Load Express
const app = express();
const PORT = process.env.PORT || 3000;

// Serve the Front End
app.use("/", express.static("public"));

// Middleware for the JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Openai Instance and serve the API Key
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

// Route / endpoint / URL
app.post("/api/translate", async(req, res) => {
    //Translate functionality with Openai
    const { text, targetLang } = req.body;
    
    const promptSystem1 = "Eres un traductor profecional";
    const promptSystem2 = "Solo puedes responder con una respuesta directa del texto que el usuario te envie"
                        +   "Cualquier otra respuesta o conversación esta prohibida.";

    const promptUser = `Traduce el siguiente texto al idioma ${targetLang}: ${text}`;
    
    //Call the LLM or Openai model
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: promptSystem1 },
                { role: "system", content: promptSystem2 },
                { role: "user", content: promptUser },
            ],
            max_tokens: 500,
            response_format: { type: "text" },
        });

        const translatedText = completion.choices[0].message.content;
        
        return res.status(200).json({ translatedText });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error to translate" });
    }
});

// Serve the Back End
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});