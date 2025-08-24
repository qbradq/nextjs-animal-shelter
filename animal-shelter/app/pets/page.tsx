import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Pet } from "../data";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export const dynamic = "force-dynamic";

export default async function PetsPage() {
  const res = await fetch(process.env.HOST + "/api/pets");
  const pets = await res.json();
  return (
    <Grid container spacing={2} padding={2}>
      {pets.map((pet: Pet) => (
        <Grid key={pet.uuid} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Card>
            <CardMedia>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={process.env.CLOUDFRONT_URL + "/" + pet.image}
                alt={"Photo of " + pet.name}
                className="border-2 border-black rounded-lg"
              />
            </CardMedia>
            <CardContent>
              <Typography
                variant="h4"
                component="h1"
                sx={{ textAlign: "center" }}
              >
                {pet.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={"/pets/" + pet.uuid}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
