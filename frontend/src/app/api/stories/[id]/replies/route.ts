import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const response = await fetch(`${BACKEND_URL}/stories/${id}/replies`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch story with replies')
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Story replies API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch story with replies' },
      { status: 500 }
    )
  }
}
