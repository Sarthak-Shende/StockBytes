import { Card,CardContent, CardMedia, Stack, Box } from "@mui/material";
import {Typography , Link } from "@mui/material";
const NewsCard = ({newsData}) => {
    return (
        <>
        <Stack spacing={0.5} >
        {newsData.map((info) => (
            <Card key={info} sx={{display: "flex"}} >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Link component="a" variant="body2" href={`https://${info["source_domain"]}`} underline="hover" gutterBottom="true" target="_blank" className="text" >{info["source"]}</Link> <br />
                    <Link component="a" variant="h5" href={info["url"]} underline="hover" gutterBottom="true" target="_blank" id="news-heading" >{info["title"]}</Link>
                    <Typography paragraph="true" color="#333333" className="text" >
                        {info["summary"]}
                    </Typography>
                    <Typography component="p" variant="body2" color="#595959" className="text" >
                        {info["time_published"].substr(6,2)+"/"+info["time_published"].substr(4,2)+"/"+info["time_published"].substr(0,4)}
                    </Typography>
                </CardContent>
                <CardMedia image={info["banner_image"]} sx={{ objectFit:"contain" }} component="img" alt="image" id="image" />
            </Card>
        ))
        }
        </Stack>
        </>
    )
}

export default NewsCard;