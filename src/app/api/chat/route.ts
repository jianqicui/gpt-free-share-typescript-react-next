import serverConfig from '@/config/serverConfig'

export async function POST(req: Request) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 600000)

  try {
    const reqJson = await req.json()
    const stream = reqJson.stream
    const content = reqJson.content

    const baseUrl = serverConfig.baseUrl
    const apiKey = serverConfig.apiKey
    const model = serverConfig.model

    const url = `${baseUrl}/v1/chat/completions`

    const reqBodyJson = {
      model,
      stream,
      messages: [
        {
          role: 'user',
          content
        }
      ]
    }

    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(reqBodyJson),
      duplex: 'half',
      redirect: 'manual',
      signal: controller.signal
    }

    const res = await fetch(url, fetchOptions)

    return new Response(res.body)
  } catch (e) {
    return Response.json(e)
  } finally {
    clearTimeout(timeoutId)
  }
}
