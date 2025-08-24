"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GitHubButton from "react-github-btn";

export default function Footer() {
  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="primary.contrastText"
      sx={{
        paddingX: "20px",
        textAlign: "center",
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 1,
      }}
    >
      <Typography variant="body1" color="inherit">
        Brad&apos;s Example Animal Shelter is Copyright &copy;{" "}
        {new Date().getFullYear()} Norman B. Lancaster (
        <Link href="mailto:qbradq@gmail.com" color="primary.contrastText">
          qbradq@gmail.com
        </Link>
        )
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: { xs: 1, sm: 2 },
          marginX: "auto",
        }}
      >
        <GitHubButton
          href="https://github.com/qbradq"
          data-size="large"
          data-show-count="true"
          aria-label="Follow @qbradq on GitHub"
        >
          Follow @qbradq
        </GitHubButton>
        <GitHubButton
          href="https://github.com/qbradq/nextjs-animal-shelter"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star qbradq/nextjs-animal-shelter on GitHub"
        >
          See Code
        </GitHubButton>
      </Box>
    </Box>
  );
}
