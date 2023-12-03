import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios' 
dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  organization: "org-hiESclzKlRsum2HFwTVge2jz",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/image/generation",
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWU2ZDQwOTktZTUyMi00MTM1LWIxMzctYjI1M2EzMTRlZjJlIiwidHlwZSI6ImFwaV90b2tlbiJ9.hcCV24W5qfu0Ra80PCX_9KoczotmhZa4s0Rr6o6IW74",
      },
      data: {
        show_original_response: false,
        fallback_providers: "",
        providers: "openai",
        text: prompt,
        resolution: "512x512",
      },
    };

    const result  = await axios.request( options );
    // console.log(result.data.openai.items[0]);
    res.status(200).json({ photo: result.data.openai.items[0].image });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

export default router;
