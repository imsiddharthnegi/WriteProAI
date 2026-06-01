import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { text, mode } = await req.json()

  if (!text || text.trim().length < 10) {
    return Response.json({ suggestions: [] })
  }

  const modeInstructions: Record<string, string> = {
    blog: 'engaging, conversational, and SEO-friendly blog content',
    email: 'professional, clear, and concise email communication',
    technical: 'precise, accurate, and well-structured technical documentation',
    creative: 'vivid, expressive, and imaginative creative writing',
    social: 'punchy, attention-grabbing social media content'
  }

  const prompt = `You are an expert writing coach helping improve ${modeInstructions[mode] || 'professional writing'}.

Analyze the text below and return ONLY a valid JSON object.
No preamble, no explanation, no markdown backticks. Raw JSON only.

Return exactly this structure:
{
  "suggestions": [
    {
      "type": "Clarity",
      "issue": "one sentence describing the problem",
      "original": "exact phrase from the text",
      "improved": "your improved version",
      "reason": "one sentence explaining why this is better"
    }
  ]
}

Rules:
- Return 2 to 4 suggestions maximum. Never more.
- Types must be one of: Clarity, Tone, Conciseness, Word Choice, Structure, Grammar
- "original" must be an exact substring from the input text
- Keep improvements concise — do not rewrite entire sentences unless absolutely necessary
- Never suggest changes that alter the writer's core meaning
- If the text is already excellent, return 1 suggestion maximum

Text to analyze:
"${text}"`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: prompt }] 
          }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1000,
          }
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    const cleaned = rawText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const parsed = JSON.parse(cleaned)
    return Response.json(parsed)

  } catch (error) {
    console.error('Gemini API error:', error)
    return Response.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}
