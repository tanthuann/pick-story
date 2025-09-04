'use client'

import { useState } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

interface Story {
  _id: string
  title: string
  content: string
  author: string
  createdAt: string
}

interface ReplyDialogProps {
  story: Story
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export default function ReplyDialog({ story, open, onOpenChange, onSuccess }: ReplyDialogProps) {
  const [replyContent, setReplyContent] = useState('')
  const [replyAuthor, setReplyAuthor] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { createReply } = await import('@/lib/api')
      await createReply({
        storyId: story._id,
        content: replyContent.trim(),
        author: replyAuthor.trim(),
      })

      setReplyContent('')
      setReplyAuthor('')
      onSuccess()
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setReplyContent('')
    setReplyAuthor('')
    setError('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reply to &ldquo;{story.title}&rdquo;</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Story Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Original Story:</h4>
            <p className="text-sm text-gray-600 line-clamp-4">{story.content}</p>
            <p className="text-xs text-gray-500 mt-2">By {story.author}</p>
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reply-author" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <Input
                id="reply-author"
                type="text"
                value={replyAuthor}
                onChange={(e) => setReplyAuthor(e.target.value)}
                placeholder="Enter your name"
                required
                maxLength={100}
              />
            </div>
            
            <div>
              <label htmlFor="reply-content" className="block text-sm font-medium text-gray-700 mb-1">
                Your Reply
              </label>
              <Textarea
                id="reply-content"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Share your thoughts, reactions, or relate your own experience..."
                required
                minLength={1}
                maxLength={2000}
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {replyContent.length}/2000 characters
              </p>
            </div>
            
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
          </form>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isLoading || !replyContent.trim() || !replyAuthor.trim()}
          >
            {isLoading ? 'Submitting...' : 'Submit Reply'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
