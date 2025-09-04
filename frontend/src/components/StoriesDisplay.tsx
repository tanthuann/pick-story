'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Reply {
  _id: string
  content: string
  author: string
  createdAt: string
}

interface Story {
  _id: string
  title: string
  content: string
  author: string
  replyCount: number
  createdAt: string
}

interface StoryWithReplies extends Story {
  replies: Reply[]
}

export default function StoriesDisplay() {
  const [stories, setStories] = useState<Story[]>([])
  const [selectedStory, setSelectedStory] = useState<StoryWithReplies | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingReplies, setLoadingReplies] = useState(false)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const { fetchStories: apiFetchStories } = await import('@/lib/api')
      const data = await apiFetchStories()
      setStories(data.stories || [])
    } catch (error) {
      console.error('Failed to fetch stories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStoryWithReplies = async (storyId: string) => {
    setLoadingReplies(true)
    try {
      const { fetchStoryWithReplies: apiFetchStoryWithReplies } = await import('@/lib/api')
      const data = await apiFetchStoryWithReplies(storyId)
      setSelectedStory({
        ...data.story,
        replies: data.replies
      })
    } catch (error) {
      console.error('Failed to fetch story with replies:', error)
    } finally {
      setLoadingReplies(false)
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Stories List */}
      {!selectedStory && (
        <div className="grid gap-4">
          {stories.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No stories yet. Be the first to share one!
            </p>
          ) : (
            stories.map((story) => (
              <Card key={story._id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>By {story.author}</span>
                    <span>{formatDate(story.createdAt)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">{story.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {story.replyCount} {story.replyCount === 1 ? 'reply' : 'replies'}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => fetchStoryWithReplies(story._id)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Selected Story with Replies */}
      {selectedStory && (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedStory(null)}
            className="mb-4"
          >
            ← Back to Stories
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{selectedStory.title}</CardTitle>
              <div className="flex justify-between text-sm text-gray-500">
                <span>By {selectedStory.author}</span>
                <span>{formatDate(selectedStory.createdAt)}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedStory.content}</p>
            </CardContent>
          </Card>

          {/* Replies Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Replies ({selectedStory.replies.length})
            </h3>
            
            {loadingReplies ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            ) : selectedStory.replies.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No replies yet. Be the first to reply!
              </p>
            ) : (
              selectedStory.replies.map((reply) => (
                <Card key={reply._id} className="ml-4 border-l-4 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span className="font-medium">{reply.author}</span>
                      <span>{formatDate(reply.createdAt)}</span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
