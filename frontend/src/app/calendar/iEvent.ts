export interface iEvent {
    id: number,
    organizer: {
        name: string;
        address: string;
    };
    startDateTime: string;
    endDateTime: string;
    body: string;
    bodyPreview: string,
    webLink: string;
    attendees: {
        name: string;
        address: string;
    }[];
    subject: string;
}