/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useRef, useState } from 'react';

import { Box, Container, IconButton, Slider } from '@mui/material';
import {
  SkipNext,
  PlayArrow,
  SkipPrevious,
  Shuffle,
  RepeatOne,
  Pause,
} from '@mui/icons-material';

import axios from 'axios';

import { type Song } from '@/model';
import { useAudio } from '@/hooks/useAudio';

export const BottomBar = () => {
  const getSong = async (setSong: (data: Song) => void) => {
    const { data } = await axios.get<Song>('http://localhost:8000/api/next');
    setSong(data);
  };
  const [active, setActive] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState<Song>();

  const { url, setUrl } = useAudio();

  const audioElement = useRef<HTMLAudioElement>(null);

  const handleTimeUpdate = () => {
    setCurrentTime(audioElement.current?.currentTime ?? 0);
  };

  const handleSeek = (newTime: number) => {
    console.log('newTime', newTime);
    if (audioElement.current) {
      audioElement.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleTogglePlay = () => {
    if (audioElement.current) {
      if (isPlaying) {
        audioElement.current.pause();
      } else {
        void audioElement.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioElement.current) {
      void audioElement.current.play();
      setIsPlaying(true);
    }
  }, [url]);

  useEffect(() => {
    if (song !== undefined) {
      setUrl(`http://localhost:8000/storage/filePath/${song.file_path}`);
    }
  }, [setUrl, song]);

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bgcolor="rgba(29, 33, 35, 0.3)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      sx={{
        backdropFilter: 'blur(15px)',
      }}
      py="35px"
    >
      <Box
        component="audio"
        ref={audioElement}
        onTimeUpdate={handleTimeUpdate}
        sx={{
          display: 'hidden',
        }}
        src={url}
      />

      <Container>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            columnGap="42px"
          >
            <IconButton>
              <Shuffle />
            </IconButton>
            <IconButton onClick={() => getSong(setSong)}>
              <SkipPrevious />
            </IconButton>
            <IconButton
              size="large"
              onClick={handleTogglePlay}
              sx={{
                bgcolor: '#FACD66',
                ':hover': {
                  bgcolor: '#FACD66',
                },
                boxShadow: '0px 0px 18px rgba(255, 255, 255, 0.3)',
              }}
            >
              {isPlaying ? (
                <Pause fontSize="inherit" />
              ) : (
                <PlayArrow fontSize="inherit" />
              )}
            </IconButton>
            <IconButton onClick={() => getSong(setSong)}>
              <SkipNext />
            </IconButton>
            <IconButton
              onClick={() => {
                setActive((prev) => !prev);
              }}
            >
              <RepeatOne {...(active && { sx: { color: '#FACD66' } })} />
            </IconButton>
          </Box>
        </Box>
        <Slider
          aria-label="Default"
          value={currentTime}
          valueLabelDisplay="auto"
          onChange={(_, value) => {
            handleSeek(value as number);
          }}
          min={1}
          max={audioElement.current ? audioElement.current.duration : 100}
        />
      </Container>
    </Box>
  );
};
