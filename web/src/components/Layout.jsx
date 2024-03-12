"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Box,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Drawer as MUIDrawer,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { bgBlur } from "utils/cssStyles";
import Logo from "components/Logo";
import Icon from "components/Icon";
import DrawerItem from "components/DrawerItem";
import Footer from "components/Footer";
import ScrollbarWrapper from "components/ScrollbarWrapper";
import { login } from "utils/auth";

// define top bar width
const BAR_HEIGHT_MOBILE = 64;
const BAR_HEIGHT_DESKTOP = 60;

// define navigation drawer width
const DRAWER_WIDTH = 240;

// bug report external link
export const BUG_REPORT_URL =
  "https://help.iiit.ac.in/projects/web-administration/issues/new";

function Bar({ onOpenDrawer }) {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        ...bgBlur({ color: theme.palette.background.default, opacity: 0.45 }),
        boxShadow: "none",
        [theme.breakpoints.up("lg")]: {
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: BAR_HEIGHT_MOBILE,
          [theme.breakpoints.up("lg")]: {
            minHeight: BAR_HEIGHT_DESKTOP,
            padding: theme.spacing(0, 5),
          },
        }}
      >
        <IconButton
          onClick={onOpenDrawer}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <Icon variant="menu-rounded" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {/* <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack> */}
      </Toolbar>
    </AppBar>
  );
}

function Drawer({ drawerOpen, onCloseDrawer }) {
  const theme = useTheme();
  const pathname = usePathname();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    if (drawerOpen) onCloseDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // nav items that everybody can see
  const publicItems = (
    <List disablePadding sx={{ p: 1, pt: 1 }}>
      <DrawerItem
        title="home"
        path="/"
        icon={<Icon variant="home-outline-rounded" />}
      />
      <DrawerItem
        title="events"
        path="/events?upcoming=true&completed=true"
        icon={<Icon variant="event-rounded" />}
      />
      <DrawerItem
        title="members"
        path="/members"
        icon={<Icon variant="groups-rounded" />}
      />
      <DrawerItem
        title="gallery"
        path="/gallery"
        icon={<Icon variant="photo-library-rounded" />}
      />
    </List>
  );

  const LoginItems = (
    <List disablePadding sx={{ p: 1, ml: 0.5 }}>
      <DrawerItem
        title="login"
        onClick={login}
        icon={<Icon variant="vpn-key-rounded" />}
      />
    </List>
  );

  const drawerContent = (
    <>
      <ScrollbarWrapper>
        <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
          <Logo />
        </Box>
        {publicItems}
        <Box sx={{ flexGrow: 1 }} />
      </ScrollbarWrapper>
      {LoginItems}
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: DRAWER_WIDTH },
        color: alpha(theme.palette.background.neutral, 0.08),
      }}
    >
      {isDesktop ? (
        <MUIDrawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.menu",
              borderRightStyle: "dashed",
            },
          }}
        >
          {drawerContent}
        </MUIDrawer>
      ) : (
        <MUIDrawer
          open={drawerOpen}
          onClose={onCloseDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.menu",
            },
          }}
        >
          {drawerContent}
        </MUIDrawer>
      )}
    </Box>
  );
}

export function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Bar onOpenDrawer={() => setDrawerOpen(true)} />
      <Drawer
        drawerOpen={drawerOpen}
        onCloseDrawer={() => setDrawerOpen(false)}
      />
    </>
  );
}

export function Content({ children, ...props }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <ScrollbarWrapper>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box
          component="main"
          sx={{
            overflow: "auto",
            width: "100%",
            paddingTop: `${BAR_HEIGHT_MOBILE}px`,
            paddingBottom: theme.spacing(5),
            [theme.breakpoints.up("lg")]: {
              paddingTop: `${BAR_HEIGHT_DESKTOP}px`,
              paddingLeft: `${DRAWER_WIDTH}px`,
              paddingRight: theme.spacing(2),
            },
          }}
        >
          <Box px={isDesktop ? 4 : 2}>
            {children}
            <Footer club={props.club} />
          </Box>
        </Box>
      </Box>
    </ScrollbarWrapper>
  );
}
