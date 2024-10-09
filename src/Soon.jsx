import React, { useState, useEffect, useCallback } from 'react';

export default function Soon() {
  const [email, setEmail] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // List of images to cycle through
  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss-qaRHF3Ry5nvIxxpVPpdjJoJZAz2aVn.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss1-4JATTF21Wz7AdmGnXQMs5vP21TtNgf.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss2-tiOvdGC2uSeFBEp6UEk77qNLVqqNka.webp",
  ];

  const handleNextImage = useCallback(() => {
    setIsTransitioning(true); // Start blur effect
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Change image
      setIsTransitioning(false); // Remove blur effect
    }, 1000); // Wait for 1 second before changing the image
  }, [images.length]);

  // Automatically change images after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [handleNextImage]);

  const handleDotClick = (index) => {
    if (index !== currentImage) {
      setIsTransitioning(true); // Start blur effect
      setTimeout(() => {
        setCurrentImage(index); // Change image to the clicked dot's index
        setIsTransitioning(false); // Remove blur effect
      }, 1000); // Wait for 1 second before changing the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Subscription successful! Check your email for confirmation.');
        setEmail(''); // Clear email input after successful submission
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-yellow-100 text-center py-1 text-sm">
        Are you ready for our new online store?
      </div>
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="md:w-1/3 relative">
          <div className="absolute top-3 left-4 text-2xl font-bold pointer-events-none z-10">ERIN</div>
          <img
            src={images[currentImage]} // dynamically select the current image
            alt="Person holding white fabric in front of face"
            className={`w-[600px] h-full object-cover transition-all duration-1000 ${
              isTransitioning ? 'blur-md opacity-70' : 'blur-0 opacity-100'
            }`}
          />
          <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full cursor-pointer ${
                  currentImage === index
                    ? 'bg-black'
                    : 'border-2 border-black'
                }`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>
        <div className="md:ml-36 md:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center">
              Coming Soon
            </h1>
            <div className="flex justify-between mb-8">
              <div className="w-[45%]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss1-4JATTF21Wz7AdmGnXQMs5vP21TtNgf.webp"
                  alt="Person wearing blue sweater with arms raised"
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="w-[45%]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss2-tiOvdGC2uSeFBEp6UEk77qNLVqqNka.webp"
                  alt="Person wearing off-white knit sweater"
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <p className="text-center mb-4">
              Be the first to subscribe and get $15 credit towards your next
              purchase!
            </p>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email*"
                  required
                  className="flex-grow px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
