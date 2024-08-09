import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const apiKey = process.env.BREVO_API_KEY;

    const url = "https://api.brevo.com/v3/smtp/email";
    const headers = {
      accept: "application/json",
      "api-key": apiKey!,
      "content-type": "application/json",
    };

    const data = {
      sender: {
        name: "Kühlender Klang vor dem Herbst",
        email: "irec.concert@gmail.com",
      },
      to: [{ email: email }],
      subject: "Kühlender Klang vor dem Herbst",
      htmlContent: `
      <p>Dear Attendee,</p>

      <p>You have been successfully registered to the IREC Berlin concert: </p>
      <strong>Kühlender Klang vor dem Herbst</strong>
      <p>
        <strong>Date:</strong> 
        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=IREC+Berlin+Concert+2024&details=IREC+Berlin+Concert+2024%0A%0AK%C3%BChlender+Klang+vor+dem+Herbst%0A%0ASaturday%2C+31st+August+2024%2C+03%3A00+PM+%28CEST%29%0A%0A&location=St.+Matth%C3%A4us+Church%2C+Matth%C3%A4ikirchplatz%2C+10785+Berlin&dates=20240831T130000Z/20240831T150000Z" target="_blank">
        Saturday, 31st August 2024, 03:00 PM (CEST)
        </a>
      </p>

      <p>For more information, you can send an email to: 
      <a href="mailto:info@irec-berlin.org">info@irec-berlin.org</a>
      </p>

      <p>See you there!</p>

      <p>Kind regards,
      <br/>
      IREC Berlin</p>

      <p>P.S.: This is an automated email. Please do not reply to this email.</p>

      <p>-----</p>

      <p>Liebe Teilnehmer,</p>

      <p>Sie haben sich erfolgreich für das Konzert des IREC Berlin angemeldet: </p>
      <strong>Kühlender Klang vor dem Herbst</strong>
      <p>
        <strong>Datum:</strong> 
        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=IREC+Berlin+Concert+2024&details=IREC+Berlin+Concert+2024%0A%0AK%C3%BChlender+Klang+vor+dem+Herbst%0A%0ASaturday%2C+31st+August+2024%2C+03%3A00+PM+%28CEST%29%0A%0A&location=St.+Matth%C3%A4us+Church%2C+Matth%C3%A4ikirchplatz%2C+10785+Berlin&dates=20240831T130000Z/20240831T150000Z" target="_blank">
        Samstag, 31. August 2024, 03:00 PM (CEST)
        </a>
      </p>

      <p>Für weitere Informationen können Sie eine E-Mail senden an:
      <a href="mailto:info@irec-berlin.org">info@irec-berlin.org</a>
      </p>

      <p>Wir sehen uns dort!</p>

      <p>Mit freundlichen Grüßen,
      <br/>
      IREC Berlin</p>

      <p>P.S.: Dies ist eine automatisierte E-Mail. Bitte antworten Sie nicht auf diese E-Mail.</p>
  `,
    };

    await axios.post(url, data, { headers });
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email. Please check your data" },
      { status: 500 }
    );
  }
}
