import { motion } from 'framer-motion';

function SponsorStatements() {
  const sponsorChallenges = [
    {
      id: 1,
      description: "Create an AI-powered app that analyzes live phone calls for scams, alerts users in real-time, and adapts to new scam patterns. Focus on privacy, security, and ease of use.",
      learnMoreLink: "https://drive.google.com/file/d/1LhnqvkhCyxOw4oTJKSQixp7lvmu1p9Gs/view?usp=drivesdk"
    },
    {
      id: 2,
      description: "Use Cloudflare's various services to build a Universal AI meeting assistant for seamless Cross Platform Productivity. For more information, refer the case/brief file.",
      learnMoreLink: "https://drive.google.com/file/d/1vfMx2kFkW3klkHyZVOy31l_YOtyxskzs/view?usp=drivesdk"
    },
    {
      id: 3,
      description: "Build a React Native chatroom for passengers with nickname-based access, offline messaging, AI moderation, and real-time flight updates. For more information refer to the brief attached.",
      learnMoreLink: "https://drive.google.com/file/d/1vgwQZcalnOTpqajUJwqRgsFHNal4lqjA/view?usp=drivesdk"
    },
    {
      id: 4,
      description: "Create a chatbot to recommend the right ITR forms, suggest tax-saving investments, ensure data privacy, and support seamless platform integration.",
      learnMoreLink: "https://drive.google.com/file/d/1vgyURhxtbp4LmBBjARkq7TU4nAZjyTak/view?usp=drivesdk"
    },
    {
      id: 5,
      description: "Develop an offline, defence-themed React Native game with customizable avatars, military obstacles, rank progression, and seamless app integration. For more information refer to the brief attached.",
      learnMoreLink: "https://drive.google.com/file/d/1vhJjBXxtseXEpwU5DX6o4ydyxU7z_1bn/view?usp=drivesdk"
    }
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
       
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-16 relative z-10"
      >
        <h2 className="innerve-title text-3xl md:text-5xl lg:text-6xl mb-6">
          SPONSOR CHALLENGES
        </h2>
        <p className="text-white text-lg opacity-80 max-w-2xl mx-auto">
          Exciting problem statements from our sponsors
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {sponsorChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#2a0d46] to-[#1a0930] p-6 rounded-lg shadow-lg border border-violet-900/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-800/20 rounded-bl-full"></div>
            <p className="text-white mb-4 text-sm md:text-base relative z-10">{challenge.description}</p>
            <div className="flex justify-end relative z-10">
              <a
                href={challenge.learnMoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 text-sm font-medium transition-colors"
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default SponsorStatements;
