class ServerConfig {
  baseUrl: string
  apiKey: string
  model: string

  constructor() {
    this.baseUrl = process.env.OPENAI_BASE_URL!
    this.apiKey = process.env.OPENAI_API_KEY!
    this.model = process.env.MODEL!
  }
}

const serverConfig = new ServerConfig()

export default serverConfig
