import StoryInput from '@/components/StoryInput'
import StoriesDisplay from '@/components/StoriesDisplay'
import StoryPicker from '@/components/StoryPicker'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pick Story</h1>
          <p className="text-gray-600">Share your stories, read others, and connect through storytelling</p>
        </div>

        {/* Section 1: Story Input */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Share Your Story</h2>
          <StoryInput />
        </section>

        {/* Section 2: Stories with Replies */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stories & Replies</h2>
          <StoriesDisplay />
        </section>

        {/* Section 3: Daily Story Picker */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daily Story Pick</h2>
          <p className="text-gray-600 mb-4">Discover a random story and share your thoughts (once per day)</p>
          <StoryPicker />
        </section>
      </div>
    </main>
  )
}