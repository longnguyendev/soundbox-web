import { type Comment } from '@/lib/model';
import { BASE_URL } from '@/lib/utils';
import { Box, Typography } from '@mui/material';
import { type FC } from 'react';

interface CommentsProps {
  comments: Comment[];
}

const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <Box mt={'50px'}>
      {comments.map((comment) => (
        <Box
          key={comment.id}
          display="flex"
          mb="20px"
          sx={{ backgroundColor: 'rgba(51, 55, 59, 0.37)' }}
          p={'10px'}
          borderRadius={'8px'}
        >
          <Box
            sx={{
              width: '50px',
              aspectRatio: '1',
              backgroundImage: `url(${BASE_URL}${comment.user.avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
            borderRadius="25px"
            overflow="hidden"
            mb="5px"
            mr="20px"
          />
          <Box>
            <Typography color={'#2d559b'}>{comment.user.name}</Typography>
            <Typography>{comment.content}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export { Comments };
