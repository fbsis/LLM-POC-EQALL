export class CalendarAdapter {
  static adapt(data: {
    value: {
      map: (
        arg0: (event: {
          organizer: { emailAddress: any };
          start: { dateTime: any };
          end: { dateTime: any };
          body: { content: any };
          webLink: any;
          attendees: any[];
          subject: any;
        }) => {
          organizer: any;
          startDateTime: any;
          endDateTime: any;
          body: any;
          webLink: any;
          attendees: any[];
          subject: any;
        }
      ) => Event[];
    };
  }): Event[] {
    return data.value.map(
      (event: {
        organizer: { emailAddress: any };
        start: { dateTime: any };
        end: { dateTime: any };
        body: { content: any };
        webLink: any;
        attendees: any[];
        subject: any;
      }) => ({
        organizer: event.organizer.emailAddress,
        startDateTime: event.start.dateTime,
        endDateTime: event.end.dateTime,
        body: event.body.content,
        webLink: event.webLink,
        attendees: event.attendees.map((attendee) => attendee.emailAddress),
        subject: event.subject,
      })
    );
  }
}
