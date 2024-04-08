"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ClubLogo from "components/clubs/ClubLogo";

export default function ClubInfo({
  name,
  logo,
  tagline = null,
  description = null,
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={3}
        mb={2}
      >
        <ClubLogo
          name={name}
          logo={logo}
          width={isDesktop ? 100 : 48}
          height={isDesktop ? 100 : 48}
          mr={isDesktop ? 3 : 2}
        />
        <Box>
          <Typography variant={isDesktop ? "h3" : "h4"}>{name}</Typography>
          {tagline ? (
            <Typography
              variant={isDesktop ? "subtitle1" : "subtitle2"}
              color="text.disabled"
              fontWeight={400}
            >
              {tagline}
            </Typography>
          ) : null}
        </Box>
      </Box>
      <Box pt={2}>
        <Typography variant="body1" mx={1} sx={{ whiteSpace: "pre-wrap" }}>
          {description}
        </Typography>
      </Box>
    </>
  );
}
