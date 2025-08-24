import { Pet } from "@/app/data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Params } from "next/dist/server/request/params";

export const dynamic = "force-dynamic";

export default async function PetPage({ params }: { params: Params }) {
  const { id } = await params;
  const res = await fetch(`${process.env.HOST}/api/pets/${id}`);
  const pet: Pet = await res.json();
  return (
    <Container maxWidth="lg">
      <Box
        gap={2}
        padding={2}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center">
          {pet.name}
        </Typography>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={process.env.CLOUDFRONT_URL + "/" + pet.image}
          alt={"Photo of " + pet.name}
          className="w-sm border-2 border-black border-r-0 rounded-lg self-center"
        />
        <Typography variant="body1" component="p">
          {pet.description}
        </Typography>
        <Box
          justifyContent="end"
          sx={{
            gap: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button variant="contained">Adopt Me!</Button>
          <Button variant="contained" color="error">
            <DeleteForeverIcon fontSize="large" />
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
