"use client";
import Box from "@mui/material/Box";
import GitHubButton from "react-github-btn";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <Container maxWidth="lg">
      <Box
        component="footer"
        sx={{
          paddingX: "20px",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <Typography variant="body2" color="inherit">
          Brad&apos;s Example Animal Shelter is Copyright &copy;{" "}
          {new Date().getFullYear()} Norman B. Lancaster{" "}
          <Link href="mailto:qbradq@gmail.com">mailto:qbradq@gmail.com</Link>
        </Typography>
        <GitHubButton href="https://github.com/qbradq">
          Follow @qbradq
        </GitHubButton>
      </Box>
    </Container>
  );
}
