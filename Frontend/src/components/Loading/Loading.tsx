
import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Circles
        height={80}
        width={80}
        color="#FF0000" 
        ariaLabel="loading"
        visible={true}
      />
    </div>
  );
};

export default Loading;
