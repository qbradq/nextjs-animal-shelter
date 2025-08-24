import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h1" align="center" sx={{ mb: 2 }}>
          Brad&apos;s Example Animal Shelter
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            src="/author.jpg"
            alt="Photo of the author"
            width={512}
            height={512}
            className="mx-auto border-2 border-black rounded-lg"
          />
          <Typography variant="body1" component="p">
            This is an example full stack, cloud-deployed web application
            project that serves as a personal skills demonstration.
          </Typography>
        </Box>
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          Technologies and Services Used:
        </Typography>
        <List>
          <ListItem>
            <Link
              href="https://nextjs.org"
              component={NextLink}
              target="_blank"
            >
              Next.js - React.js Framework hosted on Vercel
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://react.dev/"
              component={NextLink}
              target="_blank"
            >
              React.js - User Interface Base
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://mui.com/material-ui/"
              component={NextLink}
              target="_blank"
            >
              Material UI - Material Design Components for React.js
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.mongodb.com/"
              component={NextLink}
              target="_blank"
            >
              MongoDB - Non-Relational Database hosted on Atlas
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://aws.amazon.com/s3/"
              component={NextLink}
              target="_blank"
            >
              Amazon S3 - Content Storage
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.cloudflare.com/"
              component={NextLink}
              target="_blank"
            >
              CloudFlare - Content Delivery Network
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://nodejs.org/"
              component={NextLink}
              target="_blank"
            >
              Node.js - JavaScript Server
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.typescriptlang.org/"
              component={NextLink}
              target="_blank"
            >
              TypeScript - Strict Typing for JavaScript
            </Link>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
