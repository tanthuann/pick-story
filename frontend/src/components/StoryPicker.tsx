'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ReplyDialog from '@/components/ReplyDialog'

interface Story {
  _id: string
  title: string
  content: string
  author: string
  createdAt: string
}

export default function StoryPicker() {
  const [pickedStory, setPickedStory] = useState<Story | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showReplyDialog, setShowReplyDialog] = useState(false)

  const pickRandomStory = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/stories/random')
      
      if (response.ok) {
        const story = await response.json()
        setPickedStory(story)
        setShowReplyDialog(true)
      } else if (response.status === 429) {
        setError('You have already picked a story today. Come back tomorrow!')
      } else {
        setError('Failed to pick a random story. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleReplySuccess = () => {
    setShowReplyDialog(false)
    // Optionally refresh the story or show success message
  }

  return (
    <div className="space-y-4">
      {!pickedStory && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Click the button below to discover a random story from our community. 
            You can pick one story per day and share your thoughts about it.
          </p>
          <Button 
            onClick={pickRandomStory} 
            disabled={isLoading}
            size="lg"
            className="px-8 py-3"
          >
            {isLoading ? 'Finding Story...' : 'Pick Random Story'}
          </Button>
          
          {error && (
            <p className="text-red-600 mt-4 p-3 bg-red-50 rounded-lg">
              {error}
            </p>
          )}
        </div>
      )}

      {pickedStory && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              🎉 Today&apos;s Story Pick!
            </h3>
            <p className="text-gray-600">
              Here&apos;s your randomly selected story for today. Take your time to read it and share your thoughts.
            </p>
          </div>
          
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-xl">{pickedStory.title}</CardTitle>
              <div className="flex justify-between text-sm text-gray-500">
                <span>By {pickedStory.author}</span>
                <span>{formatDate(pickedStory.createdAt)}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {pickedStory.content}
              </p>
            </CardContent>
          </Card>

          <div className="text-center space-y-3">
            <Button 
              onClick={() => setShowReplyDialog(true)}
              size="lg"
              className="px-8 py-3"
            >
              Reply to This Story
            </Button>
            
            <p className="text-sm text-gray-500">
              Share your thoughts, reactions, or relate your own experience
            </p>
          </div>

          {/* Reply Dialog */}
          <ReplyDialog
            story={pickedStory}
            open={showReplyDialog}
            onOpenChange={setShowReplyDialog}
            onSuccess={handleReplySuccess}
          />
        </div>
      )}
    </div>
  )
}
