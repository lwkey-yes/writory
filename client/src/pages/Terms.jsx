function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using Writory, you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to abide by the above, please do 
            not use this service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
          <p className="text-gray-700 mb-4">
            To access certain features of Writory, you must create an account. You are responsible for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and up-to-date information</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content Guidelines</h2>
          <p className="text-gray-700 mb-4">
            When using Writory, you agree not to post content that:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Is illegal, harmful, or violates others' rights</li>
            <li>Contains hate speech, harassment, or discrimination</li>
            <li>Infringes on intellectual property rights</li>
            <li>Contains spam, malware, or malicious links</li>
            <li>Is misleading or contains false information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
          <p className="text-gray-700 mb-4">
            You retain ownership of the content you create on Writory. By posting content, you grant 
            us a non-exclusive license to display, distribute, and promote your content on our platform.
          </p>
          <p className="text-gray-700 mb-4">
            The Writory platform, including its design, features, and functionality, is owned by us 
            and protected by copyright and other intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Availability</h2>
          <p className="text-gray-700 mb-4">
            We strive to maintain high availability of our service, but we do not guarantee 
            uninterrupted access. We may temporarily suspend the service for maintenance, 
            updates, or other operational reasons.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            Writory is provided "as is" without warranties of any kind. We shall not be liable 
            for any indirect, incidental, special, or consequential damages arising from your 
            use of the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to terminate or suspend your account at any time for violations 
            of these terms. You may also delete your account at any time through your profile settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
          <p className="text-gray-700 mb-4">
            We may update these terms from time to time. We will notify users of significant 
            changes via email or through the platform. Continued use of Writory after changes 
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-700">
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:prathameshlad506@gmail.com" className="text-gray-900 underline">
              prathameshlad506@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Terms;