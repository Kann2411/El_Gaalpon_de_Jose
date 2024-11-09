"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const AboutUsView = () => {
  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          src="https://fitnessextremeperu.com/wp-content/uploads/2023/12/portada-maquinas-ejercicio.jpg"
          alt="FitZone Gym"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center px-4 py-6 bg-black bg-opacity-50 rounded-lg">
        <div className="text-center mb-2">
          <h1 className="text-white text-3xl font-extrabold">
            About <span className="text-red-600">Us</span>
          </h1>
        </div>
          <p className="text-xl md:text-2xl">Empowering Your Fitness Journey Since 2010</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg mb-4">
              FitZone was born from a passion for fitness and a vision to create a gym that caters to everyone, regardless of their fitness level or goals. Founded in 2010 by fitness enthusiasts John Doe and Jane Smith, our journey began in a small warehouse with just a handful of equipment and a dream.
            </p>
            <p className="text-lg mb-4">
              Over the years, we've grown from that humble beginning into a state-of-the-art facility that spans over 50,000 square feet. Our growth is a testament to our commitment to our members and our philosophy of constant innovation in the fitness industry.
            </p>
            <p className="text-lg">
              Today, FitZone is more than just a gym – it's a community. We've helped thousands of members transform their lives, and we continue to evolve and expand our offerings to meet the changing needs of our diverse membership base.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://rafaelalviarez.site/wp-content/uploads/2023/03/marketing-para-gimnasios-en-Peru.jpg"
              alt="FitZone Through the Years"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-red-600 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl md:text-2xl">
            To inspire and empower individuals to achieve their fitness goals in a supportive, innovative, and inclusive environment.
          </p>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Sets Us Apart</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[{
            title: "State-of-the-Art Equipment",
            description: "Our gym is equipped with the latest fitness technology and machinery to ensure you have everything you need for an effective workout.",
            icon: "🏋️‍♂️"
          }, {
            title: "Expert Trainers",
            description: "Our certified trainers are passionate about helping you achieve your fitness goals with personalized guidance and support.",
            icon: "👨‍🏫"
          }, {
            title: "Diverse Class Offerings",
            description: "From high-intensity interval training to yoga and everything in between, we offer a wide range of classes to keep your workouts exciting and effective.",
            icon: "🧘‍♀️"
          }, {
            title: "Nutrition Guidance",
            description: "We believe that fitness goes beyond the gym. Our nutrition experts provide personalized meal plans and advice to complement your workout routine.",
            icon: "🥗"
          }, {
            title: "Community Events",
            description: "We foster a strong sense of community through regular events, challenges, and social gatherings that make fitness fun and engaging.",
            icon: "🎉"
          }, {
            title: "24/7 Access",
            description: "Your fitness journey doesn't stop, and neither do we. Enjoy round-the-clock access to our facilities to work out on your schedule.",
            icon: "🕰️"
          }].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-zinc-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Development Team Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Meet Our Development Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Front-end-1",
                role: "Front-end Developer",
                image: "/foto-perfil1.jpeg",
                bio: "breve descripción de la persona",
                social: { linkedin: "#", github: "#" }
              },
              {
                name: "Front-end-2",
                role: "Front-end Developer",
                image: "/foto-perfil2.jpeg",
                bio: "breve descripción de la persona",
                social: { linkedin: "#", github: "#" }
              },
              {
                name: "front-end-3",
                role: "Front-end Developer",
                image: "/foto-perfil3.jpeg",
                bio: "breve descripción de la persona",
                social: { linkedin: "#", github: "#" }
              },
              {
                name: "back-end-1",
                role: "Back-end Developer",
                image: "/foto-perfil4.jpeg",
                bio: "breve descripción de la persona",
                social: { linkedin: "#", github: "#" }
              },
              {
                name: "back-end-2",
                role: "Back-end Developer",
                image: "/foto-perfil5.jpeg",
                bio: "breve descripción de la persona",
                social: { linkedin: "#", github: "#" }
              },
              {
                name: "back-end-3",
                role: "Back-end Developer",
                image: "/foto-perfil6.jpeg",
                bio: "breve descripción de la persona",
                social: { linkedin: "#", github: "#" }
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-red-500 mb-4">{member.role}</p>
                  <p className="text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    {Object.entries(member.social).map(([platform, link]) => {
                      const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                      return link ? (
                        <a key={platform} href={link} target="_blank" rel="noopener noreferrer">
                          <IconComponent className="w-6 h-6 text-zinc-500 hover:text-white transition-colors" />
                        </a>
                      ) : null;
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-zinc-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg mb-8">
            Have questions about FitZone or want to learn more about our services? We'd love to hear from you!
          </p>
          <a
            href="mailto: fitzone463@gmail.com"
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <Mail className="mr-2" />
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default AboutUsView