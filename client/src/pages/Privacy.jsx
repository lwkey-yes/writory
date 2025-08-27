function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            When you create an account on Writory, we collect:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Your email address and name for account creation</li>
            <li>Profile information you choose to provide (bio, avatar)</li>
            <li>Content you create (posts, comments, likes)</li>
            <li>Usage data to improve our service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Provide and maintain our writing platform</li>
            <li>Enable you to create and share content</li>
            <li>Communicate with you about your account</li>
            <li>Improve our services and user experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate security measures to protect your personal information:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Passwords are encrypted using industry-standard methods</li>
            <li>Data is transmitted over secure HTTPS connections</li>
            <li>Access to personal data is restricted to authorized personnel</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Access and update your personal information</li>
            <li>Delete your account and associated data</li>
            <li>Export your content</li>
            <li>Opt out of non-essential communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
          <p className="text-gray-700 mb-4">
            We use cookies and similar technologies to enhance your experience and maintain your session. 
            You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:prathameshlad506@gmail.com" className="text-gray-900 underline">
              prathameshlad506@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Privacy;