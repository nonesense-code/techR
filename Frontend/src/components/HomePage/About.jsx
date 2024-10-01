import React from "react";

function About() {
  return (
    <div className="w-full h-auto">

      {/* About Section */}
      <section id="about" className="px-8 py-16 bg-gray-800 w-auto h-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          About TechR
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto text-center">
          At TechR, we are pioneers in providing state-of-the-art technology
          solutions. Our mission is to empower businesses and individuals with
          cutting-edge products that transform the way they interact with
          technology.
        </p>
      </section>

      {/* Mission Section */}
      <section className="px-8 py-16 bg-gray-900 w-auto h-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Our Mission
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto text-center">
          Our mission is to build a bridge between technology and people by
          designing innovative solutions that enhance productivity, simplify
          processes, and drive digital transformation in various industries.
        </p>
      </section>

      {/* Vision Section */}
      <section className="px-8 py-16 bg-gray-800 w-auto h-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Our Vision
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto text-center">
          TechR envisions a future where technology is seamlessly integrated
          into everyday life. We aim to be the global leader in tech innovation,
          making advanced technology accessible to everyone and fostering a
          sustainable, connected world.
        </p>
      </section>

      {/* Core Values Section */}
      <section className="px-8 py-16 bg-gray-900 w-auto h-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Our Core Values
        </h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 mb-4">
            <strong className="text-white">Innovation:</strong> We thrive on
            bringing new and creative solutions to the table.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            <strong className="text-white">Integrity:</strong> We operate with
            transparency, honesty, and a strong ethical foundation.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            <strong className="text-white">Customer-Centricity:</strong> Our
            customers are at the core of everything we do, and their satisfaction
            drives our success.
          </p>
          <p className="text-lg text-gray-300">
            <strong className="text-white">Sustainability:</strong> We are
            committed to reducing our environmental footprint and promoting
            sustainable technology practices.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="px-8 py-16 bg-gray-800 w-auto h-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Meet Our Team
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto text-center mb-8">
          Behind every successful company is a team of passionate and dedicated
          individuals. Meet the people who are driving TechR to new heights.
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-white">Jane Doe</h3>
            <p className="text-gray-400">CEO</p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-white">John Smith</h3>
            <p className="text-gray-400">CTO</p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-white">Emily Johnson</h3>
            <p className="text-gray-400">COO</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
