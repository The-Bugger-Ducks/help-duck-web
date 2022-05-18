import React, { useEffect, useRef } from "react";

import lottie from "lottie-web";
import loading_lottie from "../../assets/animation/settings-loading.json";

import "../../styles/components/loading/loadingContainer.css";

interface Props {
  loading: boolean
}

const LoadingContainer: React.FC<Props> = ({loading}) => {

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading && container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loading_lottie,
      });
    }
  }, [loading]);

  return (
    <>
      {loading ? 
        <div id="loading_container">
          <div ref={container} className="loading_lottie"/>
        </div>
      : null}
    </>
  );
};

export default LoadingContainer;
