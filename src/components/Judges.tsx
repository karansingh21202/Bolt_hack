import React from 'react';

interface Judge {
  imageUrl: string;
  name: string;
  description: string;
  twitterLink: string;
}

const judges: Judge[] = [
  {
    imageUrl: "/svgs/sarah_guo.jpg",
    name: "Sarah Guo",
    description: "Startup Investor/Helper, Accelerating AI Adoption",
    twitterLink: "https://twitter.com/sarahguo"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/6751787?v=4",
    name: "Theo",
    description: "CEO, Youtuber, Investor & Developer",
    twitterLink: "https://twitter.com/t3dotgg"
  },
  {
    imageUrl: "https://pbs.twimg.com/profile_images/1856284397072478208/hSEXLkPN_400x400.jpg",
    name: "Evan You",
    description: "Founder & Creator",
    twitterLink: "https://twitter.com/youyuxi"
  },
  {
    imageUrl: "https://pbs.twimg.com/profile_images/1288449070344937473/fKlvccnM_400x400.jpg",
    name: "KP",
    description: "Founder of Paddle",
    twitterLink: "https://twitter.com/kp"
  },
  {
    imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQE8vjcIoqBv1g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725001092957?e=2147483647&v=beta&t=af8rAGZhnDS59jaCgFL0W0acJ8CJ4KVMe6InMAFLymo",
    name: "Alex Albert",
    description: "Head of Claude Relations",
    twitterLink: "https://twitter.com/alexalbert"
  },
  {
    imageUrl: "https://cdn.prod.website-files.com/5d123a0e13543962b1665276/5eb4e1471bebe489f508fe0e_ben-tossell-final-profile-picture.png",
    name: "Ben Tossell",
    description: "AI Builder, Coder",
    twitterLink: "https://twitter.com/bentossell"
  },
  {
    imageUrl: "https://i.imgur.com/h37yVxd.png",
    name: "Levels.io",
    description: " digital entrepreneur, developer, and digital nomad",
    twitterLink: "https://twitter.com/levelsio"
  },
  {
    imageUrl: "https://pbs.twimg.com/profile_images/1379817647139737600/YHL9uBk0_400x400.jpg",
    name: "Logan Kilpatrick",
    description: "AI Developer",
    twitterLink: "https://twitter.com/logankilpatrick"
  }
];

const Judges: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0.5px, transparent 0.5px)`,
          backgroundSize: '6px 6px',
          backgroundPosition: '0 0',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
            JUDGES
            </h2>
            {/* <img 
              src="/svgs/judge.png" 
              alt="Judge Icon" 
              className="md:w-48 md:h-48 object-contain"
              style={{ width: '300px', height: '300px' }}
            /> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {judges.map((judge, index) => (
            <a
              key={index}
              href={judge.twitterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer border border-transparent hover:border-purple-500/50"
            >
              {/* Card background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Judge image */}
              <div className="relative h-80 overflow-hidden flex items-center justify-center">
                <img
                  src={judge.imageUrl}
                  alt={judge.name}
                  className="w-64 h-64 object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-60" />
              </div>

              {/* Judge info */}
              <div className="p-6 flex flex-col items-center text-center">
                <div className="flex items-center gap-4 mb-2">
                  <svg className="w-20 h-20 text-blue-400 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <h3 className="text-xl font-bold text-white">{judge.name}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">{judge.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Judges; 