import React, { useState, useRef } from "react";
import data from "../datas/creationsSlider.json";
import AnchorTarget from "../items/AnchorTarget";
import CreationsUpperArticle from "../components/CreationsUpperArticle";
import CreationsBottomArticle from "../components/CreationsBottomArticle";
import titleAnimationHelper from "../helpers/titleAnimationHelper";
import { handleElementChangeWithTimer } from "../helpers/delayCreationsHelper";
import { useStore } from "../store";

function MyCreations() {
  const isLowDesktopDisplay = useStore((state) => state.isLowDesktopDisplay);
  const isTabletteDisplay = useStore((state) => state.isTabletteDisplay);
  const isLowTabletteDisplay = useStore((state) => state.isLowTabletteDisplay);
  const isMobileDisplay = useStore((state) => state.isMobileDisplay);
  const imgSrc = [];
  let maxImages = 0;
  data.forEach((item) => {
    maxImages = Math.max(maxImages, item.imgUrl.length);
  });
  for (let i = 0; i < maxImages; i++) {
    data.forEach((item) => {
      if (item.imgUrl.length > i) {
        imgSrc.push(item.imgUrl[i]);
      }
    });
  }
  const dataSlider = data;
  const sleepingRef = useRef(null);
  const [selectedElement, setSelectedElement] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);
  const [nextElement, setNextElement] = useState(null);
  const [newData, setNewData] = useState(dataSlider[0]);
  const [selectedImage, setSelectedImage] = useState(0);

  titleAnimationHelper(
    "creations_content_upper-title-sleepingAnimation",
    sleepingRef
  );

  const handleElementChange = (index) => {
    handleElementChangeWithTimer(
      index,
      selectedElement,
      setSelectedElement,
      setSelectedImage,
      setAnimateOut,
      dataSlider,
      setNewData
    );
  };

  return (
    <article className="creations_container">
      <AnchorTarget id="creations" />
      <div className="importantComponent">
        <div className="creations_content">
          <div className="creations_content_upper">
            <h2 className="creations_content_upper-title">
              <span>_</span>
              <span ref={sleepingRef} className="">
                Nos réalisations
              </span>
            </h2>
            <nav className="creations_content_upper-nav">
              {dataSlider.map((item, index) => (
                <CreationsUpperArticle
                  key={index}
                  item={item}
                  index={index}
                  handleElementChange={() => handleElementChange(index)}
                  selectedElement={selectedElement}
                />
              ))}
            </nav>
          </div>
          {!isLowTabletteDisplay && !isMobileDisplay ? (
            <div className="creations_content_carrousel">
              <CreationsBottomArticle
                webSiteScreen={imgSrc[selectedImage]}
                altScreen={newData?.altScreen}
                description={newData?.description}
                title={newData?.title}
                siteUrl={newData?.siteUrl}
                gitUrl={newData?.gitUrl}
                animateOut={animateOut}
                nextElement={nextElement}
                setNextElement={setNextElement}
              />
            </div>
          ) : (
            <div className="creations_content_carrousel_wrapper">
              <div className="creations_content_carrousel_items">
                {data.map((newData, index) => {
                  let resultIndex = index;
                  resultIndex += isLowDesktopDisplay
                    ? 3
                    : isTabletteDisplay || isLowTabletteDisplay
                    ? 6
                    : isMobileDisplay
                    ? 9
                    : 0;
                  return (
                    <CreationsBottomArticle
                      key={index}
                      webSiteScreen={imgSrc[resultIndex]}
                      altScreen={newData?.altScreen}
                      description={newData?.description}
                      title={newData?.title}
                      siteUrl={newData?.siteUrl}
                      gitUrl={newData?.gitUrl}
                      nextElement={nextElement}
                      setNextElement={setNextElement}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default MyCreations;