// import { Player } from '@lottiefiles/react-lottie-player';
import deliveryAnimation from '../../assets/LoadingAnimation.json'; // Download from LottieFiles
import Lottie, { LottiePlayer } from 'lottie-react';

const Loading = () => {
  return (
      <div className="h-screen flex items-center justify-center bg-base-200">
                {/* <p className="mt-4 text-lg font-medium animate-pulse">Loading ...</p> */}

      <Lottie
        autoplay
        loop
        animationData={deliveryAnimation}
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
};

export default Loading;
