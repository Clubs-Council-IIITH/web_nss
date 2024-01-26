import { getClient } from "gql/client";
import { GET_CLUB } from "gql/queries/clubs";

import { Box, Typography, Card } from "@mui/material";

import ClubBanner from "components/clubs/ClubBanner";
import ClubInfo from "components/clubs/ClubInfo";
import ClubSocials from "components/clubs/ClubSocials";

const CLUB_ID = process.env.NEXT_PUBLIC_CLUB_ID || "nss";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const { data: { club } = {} } = await getClient().query(GET_CLUB, {
    clubInput: { cid: CLUB_ID },
  });

  return (
    <Box>
      <Card variant="none" sx={{ boxShadow: 0 }}>
        <ClubBanner
          name={club.name}
          banner={club.banner}
          width={640}
          height={480}
        />
      </Card>
      <Box my={4}>
        <ClubInfo
          name={club.name}
          logo={club.logo}
          tagline={club.tagline}
          description={club.description}
        />
      </Box>
      <ClubSocials socials={club.socials} />
    </Box>
  );
}
