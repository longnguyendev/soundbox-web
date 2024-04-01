import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@/components/Link';
import ProTip from '@/components/ProTip';
import { Copyright } from '@/components';
import { type NextPageWithLayout } from './_app';
import { Layout } from '@/layouts';

const AboutPage: NextPageWithLayout = () => {
  return (
    <>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI - Next.js example in TypeScript
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </>
  );
};

AboutPage.getLayout = (page) => <Layout>{page}</Layout>;

export default AboutPage;
