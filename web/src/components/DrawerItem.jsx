"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { alpha, useTheme } from "@mui/material/styles";
import { Box, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";

import Icon from "components/Icon";

export function isExternalLink(path) {
  return path.includes("http");
}

export function getActive(path, pathname) {
  if (path === "/") return pathname === path;
  return pathname.startsWith(path.split("?")[0]);
}

export default function DrawerItem({ title, icon, path = "", onClick = null }) {
  const theme = useTheme();
  const pathname = usePathname();
  const active = path != "" ? getActive(path, pathname) : false;

  const externalLink = path != "" ? isExternalLink(path) : false;

  return (
    <ListItemButton
      {...(onClick
        ? { onClick: () => onClick(pathname) }
        : {
            component: Link,
            href: path,
          })}
      {...(externalLink
        ? {
            rel: "noopener noreferrer",
            target: "_blank",
          }
        : {})}
      sx={{
        ...theme.typography.body2,
        position: "relative",
        height: 54,
        textTransform: "capitalize",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1.5),
        marginBottom: theme.spacing(0.5),
        color: theme.palette.text.primary,
        borderRadius: 1,
        // active
        ...(active && {
          ...theme.typography.subtitle2,
          color: theme.palette.text.light,
          backgroundColor: alpha(
            theme.palette.accent,
            // theme.palette.action.selectedOpacity
            1,
          ),
        }),
      }}
    >
      <ListItemIcon
        sx={{
          width: 22,
          height: 22,
          color: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon && icon}
      </ListItemIcon>

      <ListItemText
        disableTypography
        primary={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            color="inherit"
          >
            {title}
            {externalLink && <Icon variant="link" />}
          </Box>
        }
      />
    </ListItemButton>
  );
}
