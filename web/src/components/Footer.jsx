"use client";

import Link from "next/link";
import Image from "next/image";

import { useTheme } from "@mui/material/styles";
import {
  Stack,
  Divider,
  Box,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import Icon from "components/Icon";
import { BUG_REPORT_URL } from "components/Layout";

const PRIVACY_POLICY_URL = "https://www.iiit.ac.in/privacy-policy/";
// const TWITTER_URL = "https://twitter.com/iiit_hyderabad";
// const FACEBOOK_URL = "https://www.facebook.com/IIITH";
// const INSTAGRAM_URL = "https://www.instagram.com/iiit.hyderabad/";

const IIITLogo = "/assets/iiit-logo-white.png";
const BodyLogo = "/assets/body_logo.png"

const sites = {
  website: { icon: "mdi:web", color: "#7F7F7F" },
  facebook: { icon: "ic:baseline-facebook", color: "#3C5999" },
  instagram: { icon: "mdi:instagram", color: "#E94475" },
  twitter: { icon: "mdi:twitter", color: "#05ACED" },
  linkedin: { icon: "mdi:linkedin", color: "#027FB1" },
  discord: { icon: "ic:baseline-discord", color: "#5865F3" },
  youtube: { icon: "mdi:youtube", color: "#FF3333" },
};

export default function Footer({ club = {} }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box>
      <Divider sx={{ py: 4 }} />
      <Grid container pt={5} pb={3} spacing={2} display={"flex"} flexDirection={"column"}>
        <Grid
          item
          xs={12}
          lg
          display="flex"
          alignItems="center"
          justifyContent={"center"}
        >
          <Box mr={3}>
            <Image
              src={IIITLogo}
              alt={"IIIT Hyderabad"}
              height={50}
              width={99}
              style={{ filter: "invert(100%)" }}
            />
          </Box>
          <Box>
            <Image
              src={BodyLogo}
              alt={"NSS"}
              height={50}
              width={50}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          lg
          display="flex"
          alignItems="center"
          justifyContent={"center"}
        >
          <IconButton
            component="a"
            target="_blank"
            href={`mailto:${club.email}`}
            sx={{ mx: 1, color: "text.secondary" }}
          >
            <Icon external variant="akar-icons:envelope" />
          </IconButton>
          {Object.keys(sites)
            ?.filter((k) => club.socials[k])
            ?.map((item, index) => (
              <IconButton
                component="a"
                href={club.socials[item]}
                target="_blank"
                sx={{ mx: 1, color: "text.secondary" }}
                key={index}
              >
                <Icon external variant={sites[item].icon} />
              </IconButton>
            ))
          }
          {/* <IconButton
            component="a"
            href={DISCORD_URL}
            sx={{ mx: 1, color: "text.primary" }}
          >
            <Icon external variant="akar-icons:discord-fill" />
          </IconButton> 
          <IconButton
            component="a"
            href={TWITTER_URL}
            sx={{ mx: 1, color: "text.primary" }}
          >
            <Icon external variant="akar-icons:twitter-fill" />
          </IconButton>
          <IconButton
            component="a"
            href={FACEBOOK_URL}
            sx={{ mx: 1, color: "text.primary" }}
          >
            <Icon external variant="akar-icons:facebook-fill" />
          </IconButton>
          <IconButton
            component="a"
            href={INSTAGRAM_URL}
            sx={{ mx: 1, color: "text.primary" }}
          >
            <Icon external variant="akar-icons:instagram-fill" />
          </IconButton> */}
        </Grid>
        <Grid
          item
          xs={12}
          lg
          display="flex"
          alignItems="center"
          justifyContent={"center"}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              textDecoration: "none",
              color: "black",
              // "&:hover": {
              //   textDecoration: "underline",
              // },
            }}
          >
            Developed & Maintained with ❤️ by SLC Tech Team (powered by <Typography
              variant="body2"
              component={Link}
              href={"https://clubs.iiit.ac.in/"}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "black",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Clubs Council
            </Typography>)
          </Typography>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1}>

        <Typography
          variant="body2"
          component={Link}
          href={PRIVACY_POLICY_URL}
          sx={{
            fontWeight: 600,
            textDecoration: "none",
            color: "black",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Privacy Policy
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography
          variant="body2"
          fontWeight={500}
          color="black"
        >
          © {new Date().getFullYear()}, IIIT Hyderabad
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* <Box mx={1}>·</Box> */}
        <Typography
          variant="body2"
          component={Link}
          href={BUG_REPORT_URL}
          sx={{
            fontWeight: 600,
            textDecoration: "none",
            color: "black",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Report Bugs
        </Typography>
      </Stack>
    </Box>
  );
}
