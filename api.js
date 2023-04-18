/* api.js */
import { Configuration, OpenAIApi } from 'openai'
const openaiApiKey = "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"
const configuration = new Configuration({
  apiKey: openaiApiKey
})

export const openai = new OpenAIApi(configuration)