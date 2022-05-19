import * as React from 'react';
import { Avatar, Badge, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, IconButton, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import TwitterIcon from '@mui/icons-material/Twitter';


export default function Tweet(props) {

    const tweet =
    {
        id: props.tweet.data.id,
        text: props.tweet.data.text,
        author_id: props.tweet.data.author_id,
        created_at: props.tweet.data.created_at,
        users: {
            profile_image_url: props.tweet.includes.users.profile_image_url,
            username: props.tweet.includes.users.username,
            name: props.tweet.includes.users.name
        }
    };

    return (
        <Card>
            <CardHeader avatar={<Badge badgeContent={<TwitterIcon fontSize='small' />} color="secondary" overlap="circular" anchorOrigin={{
                vertical: 'bottom', horizontal: 'right',
            }}><Avatar alt={tweet.users.name} src={tweet.users.profile_image_url}></Avatar></Badge>} title={tweet.users.username} subheader={tweet.created_at} titleTypographyProps={{ variant: 'h6', color: 'primary' }} sx={{ backgroundColor: "#fefefe" }} />
            <CardContent>
                <Typography variant="body1" color="secondary">{tweet.text}</Typography>
                <CardMedia component="img" image={tweet.source} />
            </CardContent>
        </Card>
    )
        ;
}