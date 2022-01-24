import styled from "styled-components";

export const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
};

export const SliderContainer = styled.div`
  width: 100%;
  max-height: 100%;
  display: flex !important;
  justify-content: center;
  align-items:center;
  img {
    display: inline-block;
    max-width: 100%;
    height: auto;
  }
`;