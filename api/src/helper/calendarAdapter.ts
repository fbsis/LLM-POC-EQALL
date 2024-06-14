import { format } from "date-fns";

export class CalendarAdapter {
  static adapt(data: {
    value: {
      map: (
        arg0: (event: {
          id: number,
          organizer: { emailAddress: any };
          start: { dateTime: any };
          end: { dateTime: any };
          body: { content: any };
          webLink: any;
          attendees: any[];
          subject: any;
          bodyPreview: string
        }) => {
          id: number,
          organizer: any;
          startDateTime: any;
          endDateTime: any;
          body: any;
          webLink: any;
          attendees: any[];
          subject: any;
          bodyPreview: string
        }
      ) => Event[];
    };
  }): Event[] {
    return data.value.map(
      (event: {
        id: number,
        organizer: { emailAddress: any };
        start: { dateTime: any };
        end: { dateTime: any };
        body: { content: any };
        webLink: any;
        attendees: any[];
        subject: any;
        bodyPreview: string
      }) => ({
        id: event.id,
        organizer: event.organizer.emailAddress,
        startDateTime: formatDate(event.start.dateTime),
        endDateTime: formatDate(event.end.dateTime),
        body: event.body.content,
        bodyPreview: event.bodyPreview,
        webLink: event.webLink,
        attendees: event.attendees.map((attendee) => attendee.emailAddress),
        subject: event.subject,
      })
    );
  }
}

// Helper function to format dates in MM/dd/yyyy HH:mm format
function formatDate(dateString: string) {
  return format(new Date(dateString), "MM/dd/yyyy HH:mm");
}
