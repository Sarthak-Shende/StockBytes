import { Card,CardContent, CardMedia, Stack, Box } from "@mui/material";
import {Typography , Link } from "@mui/material";
const NewsCard = ({newsData}) => {
    return (
        <>
        <Stack spacing={0.5} >
        {newsData.map((info) => (
            <Card key={info} sx={{display: "flex"}} >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Link component="a" variant="body2" href={`https://${info["source_domain"]}`} underline="hover" gutterBottom="true" target="_blank" >{info["source"]}</Link> <br />
                    <Link component="a" variant="h5" href={info["url"]} underline="hover" gutterBottom="true" target="_blank" >{info["title"]}</Link>
                    <Typography paragraph="true" >
                        {info["summary"]}
                    </Typography>
                </CardContent>
                <CardMedia image={info["banner_image"]} sx={{ objectFit: "cover",height: "144px", width: "256px" }} component="img" alt="image" />
            </Card>
        ))
        }
        </Stack>
        </>
    )
}

export default NewsCard;