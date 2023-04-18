import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello', 
    })
});

app.post('/', async (req, res) => {
    try{
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "davinci:ft-personal-2023-04-18-06-12-54",
            prompt: `Act as a question and answer AI which specialises in UNSW Policies. You will be provided with a question and you should respond based on your fine-tuning data. If the question asked isn't about UNSW policies or based on your fine-tuning data, say "Sorry, I am only able to answer questions about UNSW policies. Please ask me a question regarding to any of the policies of UNSW or its schools"
            ${prompt}`,
            temperature: 0,
            max_tokens: 400,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["\n"],
            // stop: ["    "],
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch(error) {
        console.log(error);
        res.status(500).send({ error })
    }
});

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));



