class ServerConfig {
  baseUrl: string
  apiKey: string

  constructor() {
    this.baseUrl = process.env.OPENAI_BASE_URL!
    this.apiKey = process.env.OPENAI_API_KEY!
  }
}

const serverConfig = new ServerConfig()

export default serverConfig
