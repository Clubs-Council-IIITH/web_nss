import { Box, Divider, Typography } from "@mui/material";
import EventsFilter from "components/events/EventsFilter";

import EventsGrid from "components/events/EventsGrid";

const CLUB_ID = process.env.NEXT_PUBLIC_CLUB_ID || "nss";

export const metadata = {
  title: "Events",
};

export default async function Events({ searchParams }) {
  const targetName = searchParams?.name;
  const targetClub = CLUB_ID;
  const targetState = [
    ...(searchParams?.upcoming === "true" ? ["upcoming"] : []),
    ...(searchParams?.completed === "true" ? ["completed"] : []),
  ];

  return (
    <Box>
      <Box mt={2}>
        <EventsFilter name={targetName} state={targetState} />
      </Box>

      {targetState?.includes("upcoming") ? (
        <>
          <Divider textAlign="left" sx={{ mb: 2, mt: 3 }}>
            <Typography variant="h5" color="grey">
              Upcoming Events
            </Typography>
          </Divider>

          <EventsGrid
            type="all"
            filter={(event) => {
              let selectedClub = false,
                selectedState = false,
                selectedName = false;

              // filter by club
              selectedClub = event?.clubid === targetClub;

              // filter by state
              if (!targetState) selectedState = true;
              else {
                const isUpcoming =
                  new Date(event?.datetimeperiod[1]) > new Date();
                selectedState = isUpcoming;
              }

              // filter by name
              if (!targetName) selectedName = true;
              else
                selectedName = event?.name
                  ?.toLowerCase()
                  ?.includes(targetName?.toLowerCase());

              return selectedClub && selectedState && selectedName;
            }}
          />
        </>
      ) : null}

      {targetState?.includes("completed") ? (
        <>
          <Divider textAlign="left" sx={{ mb: 2, mt: 3 }}>
            <Typography variant="h5" color="grey">
              Completed Events
            </Typography>
          </Divider>

          <EventsGrid
            type="all"
            filter={(event) => {
              let selectedClub = false,
                selectedState = false,
                selectedName = false;

              // filter by club
              selectedClub = event?.clubid === targetClub;

              // filter by state
              if (!targetState) selectedState = true;
              else {
                const isUpcoming =
                  new Date(event?.datetimeperiod[1]) > new Date();
                selectedState = !isUpcoming;
              }

              // filter by name
              if (!targetName) selectedName = true;
              else
                selectedName = event?.name
                  ?.toLowerCase()
                  ?.includes(targetName?.toLowerCase());

              return selectedClub && selectedState && selectedName;
            }}
          />
        </>
      ) : null}
    </Box>
  );
}
