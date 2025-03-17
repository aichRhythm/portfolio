export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Hi, I am Rhythm, a Frontend Developer</h1>
        <p className="text-lg mb-6">I have over 2 years of experience creating robust, user-friendly
applications, primarily for the banking, insurance and financial services sector. I specialize in building scalable,
high-performance solutions that enhance user experience and streamline business operations.</p>
      </section>
      
      <section className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="space-y-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-medium mb-4">Mobile Banking Application/Developer Tools and Libraries</h3>
            <p className="text-gray-700"> Designed and developed high-performance, reusable UI components (e.g., datepicker, dropdown,
typeahead, collapsible menus) from scratch using TypeScript and React Native, for a major banking
client, with a focus on pixel-perfect custom designs and animations. Delivered a seamless and polished user
experience across both Android and iOS platforms.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-medium mb-4">Real-time Banking Analytics Dashboard</h3>
            <p className="text-gray-700">Developed a real-time banking analytics dashboard for a major banking client using React and a
microfrontend architecture, enabling independent development, testing, and deployment of modular UI
components for features like user transaction details, account statistics, and customer feedback. Built on top of
a pre-existing Node.js backend system to deliver seamless integration.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-medium mb-4">API layer of Customer Service Application</h3>
            <p className="text-gray-700">Built and maintained RESTful APIs using Express for the customer service application of an insurance
            giant, enabling seamless interactions between customers and backend systems.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-medium mb-4">Automation of product packaging line</h3>
            <p className="text-gray-700">Designed and evaluated automation solutions to streamline sauce packaging, conducting feasibility studies and
            vendor assessments. Selected a solution projected to increase throughput by 20% and reduce labor costs.</p>
          </div>
        </div>
      </section>
      
      <section className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'TypeScript'].map(skill => (
            <span key={skill} className="px-4 py-2 bg-blue-500 text-white rounded-full">{skill}</span>
          ))}
        </div>
      </section>
      
      <section className="max-w-3xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-lg">Reach out via email: <a href="mailto:rhythmaich@example.com" className="text-blue-500">rhythmaich@gmail.com</a></p>
      </section>
    </main>
  );
}
