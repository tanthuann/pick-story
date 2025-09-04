'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function StoryInput() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          author: author.trim(),
        }),
      })

      if (response.ok) {
        setMessage('Story saved successfully!')
        setTitle('')
        setContent('')
        setAuthor('')
      } else {
        setMessage('Failed to save story. Please try again.')
      }
    } catch {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write Your Story</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <Input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
              required
              maxLength={100}
            />
          </div>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Story Title
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter story title"
              required
              maxLength={200}
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Story Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your story..."
              required
              minLength={10}
              maxLength={5000}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {content.length}/5000 characters
            </p>
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Saving...' : 'Save Story'}
          </Button>
          
          {message && (
            <p className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
