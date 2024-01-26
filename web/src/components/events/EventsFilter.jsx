"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useState, useEffect, useCallback } from "react";

import {
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ToggleButtonGroup,
  InputAdornment,
  ToggleButton,
  Stack,
} from "@mui/material";

import { useToast } from "components/Toast";
import Icon from "components/Icon";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function EventsFilter({ name, club, state }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { triggerToast } = useToast();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // show both upcoming and completed if no state is selected
  useEffect(() => {
    if (state.length === 0)
      router.push(
        `${pathname}?upcoming=true&completed=true${club ? `&club=${club}` : ""}`
      );
  }, [state]);

  // fetch list of clubs
  // const [clubs, setClubs] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     let res = await fetch("/actions/clubs/ids");
  //     res = await res.json();
  //     if (!res.ok) {
  //       triggerToast({
  //         title: "Unable to fetch clubs",
  //         messages: res.error.messages,
  //         severity: "error",
  //       });
  //     } else {
  //       setClubs(res.data);
  //     }
  //   })();
  // }, []);

  // track name field
  const [targetName, setTargetName] = useState(name || "");

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            component="form"
            direction={isDesktop? "row" : "column"}
            flexWrap="wrap"
            spacing={1}
            onSubmit={(e) => {
              e.preventDefault();
              router.push(
                `${pathname}?${createQueryString("name", targetName)}`
              );
            }}
          >
            <Grid sx={{flex: 2}}>

            <TextField
              label="Search by name"
              autoComplete="off"
              variant="outlined"
              fullWidth
              onChange={(e) => setTargetName(e.target.value)}
              value={targetName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon variant="search" />
                  </InputAdornment>
                ),
              }}
            />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mr: 1}}
            >
              Search
            </Button>

            <Grid item xs lg>
              <ToggleButtonGroup
                fullWidth
                value={state}
                color="primary"
                sx={{ height: "100%", mx: isDesktop ? 5 : 0}}
                onChange={(e) => {
                  // don't do anything if all states are being unselected
                  if (state.length === 1 && state.includes(e.target.value)) return;

                  return router.push(
                    `${pathname}?${createQueryString(
                      e.target.value,
                      !state.includes(e.target.value)
                    )}`
                  );
                }}
              >
                <ToggleButton disableRipple key="upcoming" value="upcoming">
                  Upcoming
                </ToggleButton>
                <ToggleButton disableRipple key="completed" value="completed">
                  Completed
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
