import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function GET(request: NextRequest) {
  try {
    // Forward the client's IP to the backend for daily limit tracking
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'anonymous'
    
    const response = await fetch(`${BACKEND_URL}/stories/random`, {
      headers: {
        'x-forwarded-for': clientIP,
      },
    })
    
    if (response.status === 429) {
      return NextResponse.json(
        { error: 'You have already picked a story today. Come back tomorrow!' },
        { status: 429 }
      )
    }
    
    if (!response.ok) {
      throw new Error('Failed to get random story')
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Random story API error:', error)
    return NextResponse.json(
      { error: 'Failed to get random story' },
      { status: 500 }
    )
  }
}
