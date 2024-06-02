import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import Slider, { type Settings } from 'react-slick';

export function HomeSlider() {
  const settings: Settings = {
    dots: true,
    dotsClass: 'slick-dots',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Box
      component={Slider}
      {...settings}
      sx={{
        '.slick-dots': {
          bottom: '20px',
          li: {
            width: 'unset',
            height: 'unset',
            button: {
              width: '20px',
              height: '20px',
              borderRadius: '40px',
              ':before': {
                content: 'unset',
              },
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              transition: 'width 0.33s linear',
            },
            margin: '0 5px',
            '&.slick-active': {
              button: {
                backgroundColor: '#fff',
                width: '40px',
                height: '20px',
              },
            },
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '2' }}>
        <Image
          src="/banner1.jpeg"
          fill
          sizes="100vw"
          alt=""
          style={{ objectFit: 'cover', height: '100%' }}
        />
      </Box>
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '2' }}>
        <Image
          src="/banner2.jpeg"
          fill
          sizes="100vw"
          alt=""
          style={{ objectFit: 'cover', height: '100%' }}
        />
      </Box>
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '2' }}>
        <Image
          src="/banner3.jpeg"
          fill
          sizes="100vw"
          alt=""
          style={{ objectFit: 'cover', height: '100%' }}
        />
      </Box>
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '2' }}>
        <Image
          src="/banner4.jpeg"
          fill
          sizes="100vw"
          alt=""
          style={{ objectFit: 'cover', height: '100%' }}
        />
      </Box>
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '2' }}>
        <Image
          src="/banner5.jpeg"
          fill
          sizes="100vw"
          alt=""
          style={{ objectFit: 'cover', height: '100%' }}
        />
      </Box>
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '2' }}>
        <Image
          src="/banner6.jpeg"
          fill
          sizes="100vw"
          alt=""
          style={{ objectFit: 'cover', height: '100%' }}
        />
      </Box>
    </Box>
  );
}
