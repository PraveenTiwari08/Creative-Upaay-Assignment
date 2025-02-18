import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import SmsIcon from "@mui/icons-material/Sms";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { MoreVert } from "@mui/icons-material";

function SideBar() {
  const [showOptions, setShowOptions] = useState(null);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 270,
        flexShrink: 0,
        mt: 8, // Added margin-top to push sidebar below navbar
        "& .MuiDrawer-paper": {
          width: 270,
          height: "100vh",
          boxSizing: "border-box",
          padding: 2,
          overflowY: "auto", // ✅ Enable vertical scrolling
          scrollbarWidth: "none", // ✅ Hide scrollbar (Firefox)
          "&::-webkit-scrollbar": {
            display: "none", // ✅ Hide scrollbar (Chrome, Safari)
          },
          mt: 8.7, // Ensure the drawer itself is also pushed down
        },
      }}
    >
      {/* Top Navigation Buttons */}
      <List>
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <GridViewIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ ml: -2 }} />
        </ListItem>
        <ListItem component={Link} to="/messages">
          <ListItemIcon>
            <SmsIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" sx={{ ml: -2 }} />
        </ListItem>
        <ListItem component={Link} to="/tasks">
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" sx={{ ml: -2 }} />
        </ListItem>
        <ListItem component={Link} to="/members">
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Members" sx={{ ml: -2 }} />
        </ListItem>
        <ListItem component={Link} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" sx={{ ml: -2 }} />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* My Projects Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
      >
        <Box sx={{ fontWeight: 500, fontSize: "0.835rem" }}>MY PROJECTS</Box>
        <IconButton>
          <AddBoxIcon />
        </IconButton>
      </Box>

      {/* Project Buttons */}
      <List>
        {["Mobile App", "Website Redesign", "Design System", "Wireframes"].map(
          (project, index) => (
            <ListItem
              key={index}
              component={Link} // ✅ Keep using React Router Link
              to={`/projects/${project.toLowerCase().replace(/\s+/g, "-")}`} // ✅ Dynamic URL
              sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
                color: showOptions === index ? "black" : "#787486",
                fontWeight: 700,
                bgcolor: showOptions === index ? "#dedede" : "transparent",
                textDecoration: "none",
              }}
              onClick={() =>
                setShowOptions(showOptions === index ? null : index)
              }
            >
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: ["green", "yellow", "grey", "blue"][index],
                    mr: 2,
                  }}
                />
                <ListItemText primary={project} />
              </Box>
              {showOptions === index && (
                <MoreHorizIcon sx={{ position: "absolute", right: 10 }} />
              )}
            </ListItem>
          )
        )}
      </List>

      {/* Bottom Section with Image and Input */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt="auto"
        px={2}
        py={2}
        position="relative"
        textAlign="center"
        borderRadius={4}
      >
        {/* ✅ Main Image (Wrapper for Content) */}
        <Box position="relative" width={250} height={280}>
          <img
            src="/Union.png"
            alt="Sidebar Graphic"
            style={{
              width: "100%",
              height: "120%",
              objectFit: "cover",
            }}
          />

          {/* ✅ Small Image - Positioned on top of Main Image */}
          <img
            src="/lamp-on.png"
            alt="Top Icon"
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)", // Centered horizontally
            }}
          />

          {/* ✅ Content inside the Image */}
          <Box
            position="absolute"
            top="55%"
            left="50%"
            width="80%"
            textAlign="center"
            style={{ transform: "translate(-50%, -50%)" }} // Centering Content
          >
            <Typography variant="h6" fontWeight="bold">
              Thoughts Time
            </Typography>

            <Typography variant="body2" color="gray" mt={1}>
              We don’t have any notice for you, till then you can share your
              thoughts with your peers.
            </Typography>

            {/* ✅ Input Field */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write a Message"
              size="small"
              sx={{ mt: 2, bgcolor: "white" }}
            />
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

export default SideBar;
