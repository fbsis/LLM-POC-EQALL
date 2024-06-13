// pages/calendar.tsx
"use client"
import React from 'react';
import { Box, Typography, AvatarGroup, Avatar, Modal, Paper, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const events = [
  {
    id: '1',
    startDate: '2023-10-01',
    endDate: '2023-10-02',
    participants: [
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
    ],
    description: 'Reunião de planejamento',
    details: 'Discussão sobre metas e objetivos para o próximo trimestre.',
  },
  {
    id: '2',
    startDate: '2023-10-05',
    endDate: '2023-10-05',
    participants: [
      'https://randomuser.me/api/portraits/women/3.jpg',
      'https://randomuser.me/api/portraits/men/4.jpg',
      'https://randomuser.me/api/portraits/women/5.jpg',
    ],
    description: 'Workshop de design',
    details: 'Workshop para introdução de novas técnicas de design gráfico.',
  },
  {
    id: '3',
    startDate: '2023-10-10',
    endDate: '2023-10-12',
    participants: [
      'https://randomuser.me/api/portraits/men/6.jpg',
      'https://randomuser.me/api/portraits/men/7.jpg',
    ],
    description: 'Conferência de tecnologia',
    details: 'Conferência anual sobre as últimas tendências em tecnologia.',
  },
];

function Calendar() {
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>
      <List>
        {events.map((event) => (
          <ListItem button key={event.id} onClick={() => handleOpen(event)}>
            <ListItemAvatar>
              <AvatarGroup max={3}>
                {event.participants.map((participant, index) => (
                  <Avatar key={index} src={participant} />
                ))}
              </AvatarGroup>
            </ListItemAvatar>
            <ListItemText
              primary={`${event.startDate} - ${event.endDate}`}
              secondary={event.description}
            />
          </ListItem>
        ))}
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            {selectedEvent?.description}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {selectedEvent?.details}
          </Typography>
        </Paper>
      </Modal>
    </Box>
  );
}

export default Calendar;
