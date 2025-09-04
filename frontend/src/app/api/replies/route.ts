import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${BACKEND_URL}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create reply')
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Create reply API error:', error)
    return NextResponse.json(
      { error: 'Failed to create reply' },
      { status: 500 }
    )
  }
}
