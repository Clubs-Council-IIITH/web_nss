import { getClient } from "gql/client";
import { GET_CLUB } from "gql/queries/clubs";

import { Box, Card } from "@mui/material";

import MembersGrid from "components/members/MembersGrid";
import ClubInfo from "components/clubs/ClubInfo";

const CLUB_ID = process.env.NEXT_PUBLIC_CLUB_ID || "nss";

export async function generateMetadata(parent) {
  const id = CLUB_ID;

  const { data: { club } = {} } = await getClient().query(GET_CLUB, {
    clubInput: { cid: id },
  });

  return {
    title: `Members | ${club.name}`,
  };
}

export default async function Members() {
  const id = CLUB_ID;
  const { data: { club } = {} } = await getClient().query(GET_CLUB, {
    clubInput: { cid: id },
  });
  return (
    <Box>
      <Box my={4}>
        <ClubInfo
          name={club.name}
          logo={club.logo}
        />
      </Box>
      <Box>
        <MembersGrid clubid={id} />
      </Box>
    </Box>
  );
}
