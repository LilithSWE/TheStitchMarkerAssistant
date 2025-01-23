import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Loader = () => {
  return (
    <>
      <div className="overlay">
        <div className="loader" id="loader">
          <h3>Loading...</h3>
          <DotLottieReact
            src="https://lottie.host/6184487d-13a3-4dee-892d-119d47979427/9YJwBBaLjd.lottie"
            loop
            autoplay
            speed={4}
          />
        </div>
      </div>
    </>
  );
};
