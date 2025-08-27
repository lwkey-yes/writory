import { PenTool, Users, Heart, Zap } from 'lucide-react';

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <PenTool className="h-16 w-16 text-gray-900" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Writory</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A minimal, elegant platform for writers to share their stories, thoughts, 
          and expertise with the world.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Writory was born from a simple belief: everyone has a story worth telling. 
            In a world filled with noise, we wanted to create a clean, distraction-free 
            space where writers can focus on what matters most—their words.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We're building more than just a blogging platform; we're fostering a community 
            of thoughtful writers and engaged readers who value quality content and meaningful 
            conversations.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose Writory?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PenTool className="h-6 w-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Clean Writing Experience</h3>
            <p className="text-gray-600">
              Distraction-free editor with markdown support lets you focus on your content.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Engaged Community</h3>
            <p className="text-gray-600">
              Connect with readers through comments, likes, and meaningful discussions.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
            <p className="text-gray-600">
              Built with modern technology for speed, security, and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Simplicity</h3>
            <p className="text-gray-700">
              We believe in keeping things simple and focused. No clutter, no distractions—
              just you and your words.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
            <p className="text-gray-700">
              We prioritize quality content over quantity. Every feature is designed to 
              help you create and discover meaningful writing.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
            <p className="text-gray-700">
              Writing is better when shared. We foster a supportive community where 
              writers can grow and readers can discover new perspectives.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy</h3>
            <p className="text-gray-700">
              Your data is yours. We're committed to protecting your privacy and 
              giving you control over your content.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Built with Care</h2>
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            Writory is crafted by a small team of developers and writers who are passionate 
            about creating tools that empower creativity and foster meaningful connections.
          </p>
          <p className="text-gray-600">
            We're constantly working to improve the platform based on feedback from our 
            amazing community of writers and readers.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gray-50 rounded-lg p-8">
        <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
        <p className="text-gray-700 mb-6">
          Ready to share your story? Join thousands of writers who have made Writory their home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/signup" className="btn btn-primary">
            Start Writing Today
          </a>
          <a href="mailto:prathameshlad506@gmail.com" className="btn btn-outline">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;