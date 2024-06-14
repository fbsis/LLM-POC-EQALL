// pages/calendar.tsx
"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  AvatarGroup,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MagicWandIcon from "@mui/icons-material/AutoAwesome";
import useFetchData from "../hooks/useFetchData";
import { iEvent } from "./iEvent";
import axios from 'axios';

function Calendar() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [openEvent, setOpenEvent] = useState<iEvent | null>(null);
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);
  const [summary, setSummary] = useState<string | null>(null);
  const { data, loading, error } = useFetchData<iEvent[]>("/api/calendar");

  const handleExpandClick = (id: string) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  const handleOpenEvent = (event: iEvent) => {
    setOpenEvent(event);
  };

  const handleCloseEvent = () => {
    setOpenEvent(null);
    setLoadingSummary(false);
    setSummary(null);
  };

  const handleSummaryRequest = async (event: iEvent) => {
    setLoadingSummary(true);
    try {
      const response = await axios.post('http://localhost:3001/api/calendar/sumarize', {
        body: event.body
      });
      setSummary(response.data.result);
    } catch (err) {
      console.error('Error summarizing event:', err);
      setSummary('Error summarizing event');
    } finally {
      setLoadingSummary(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>
      <List>
        {data &&
          data.map((event) => (
            <ListItem key={event.id.toString()} alignItems="flex-start">
              <ListItemAvatar>
                <AvatarGroup max={1}>
                  {event.attendees.map((participant, index) => (
                    <Avatar key={index}>{participant.name.charAt(0)}</Avatar>
                  ))}
                </AvatarGroup>
              </ListItemAvatar>
              <ListItemText
                primary={event.subject}
                secondary={
                  <React.Fragment>
                    <span>{`${event.startDateTime} - ${event.endDateTime}`}</span>
                    <span
                      style={{ display: "block" }}
                      dangerouslySetInnerHTML={{
                        __html:
                          expandedEvent === event.id.toString()
                            ? event.body
                            : event.bodyPreview,
                      }}
                    ></span>
                    {expandedEvent === event.id.toString() && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Attendees:
                        </Typography>
                        <List sx={{ pl: 2 }}>
                          {event.attendees.map((participant, index) => (
                            <ListItem key={index} alignItems="flex-start">
                              <ListItemText primary={participant.name} secondary={participant.address} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </React.Fragment>
                }
              />
              <IconButton onClick={() => {
                handleOpenEvent(event);
                handleSummaryRequest(event);
              }}>
                <MagicWandIcon />
              </IconButton>
              <IconButton
                onClick={() => handleExpandClick(event.id.toString())}
              >
                {expandedEvent === event.id.toString() ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
              <Divider component="li" />
            </ListItem>
          ))}
      </List>

      {openEvent && (
        <Dialog
          open={Boolean(openEvent)}
          onClose={handleCloseEvent}
          aria-labelledby="event-summary-title"
          aria-describedby="event-summary-description"
        >
          <DialogTitle id="event-summary-title">{openEvent.subject}</DialogTitle>
          <DialogContent>
            {loadingSummary ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : (
              <DialogContentText
                id="event-summary-description"
                dangerouslySetInnerHTML={{ __html: summary || summary }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEvent} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default Calendar;
