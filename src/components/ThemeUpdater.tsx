import { FormControlLabel } from '@mui/material';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { DarkModeSwitch } from './DarkModeSwitch';

export default function ThemeUpdater() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <FormControlLabel
      control={<DarkModeSwitch sx={{ m: 1 }} />}
      label={`${resolvedTheme === 'dark' ? 'Dark' : 'Light'} mode`}
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
      }}
      checked={resolvedTheme === 'dark'}
    />
  );
}
