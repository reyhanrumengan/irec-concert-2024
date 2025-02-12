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
        name: "Wärmender Klang zum Frühlingsbeginn",
        email: "irec.concert@gmail.com",
      },
      to: [{ email: email }],
      subject: "Wärmender Klang zum Frühlingsbeginn",
      htmlContent: `
      <p>Dear Attendee,</p>

      <p>You have been successfully registered to the IREC Hamburg concert: </p>
      <strong>Wärmender Klang zum Frühlingsbeginn</strong>
      <p>
        <strong>Date: Saturday, 29th March 2025, 03:00 PM (CET)</strong>
        </br>
        <strong>Location: Martin-Luther-Kirche - Martin-Luther-Gemeinde zu Hamburg-Alsterdorf, Bebelallee 156, 22297 Hamburg</strong>
      </p>

      <p>For more information, you can send an email to: 
      <a href="mailto:sekretaris.hamburg@gmx.de">sekretaris.hamburg@gmx.de
      </a>
      </p>

      <p>See you there!</p>

      <p>Kind regards,
      <br/>
      IREC Hamburg</p>

      <p>P.S.: This is an automated email. Please do not reply to this email.</p>

      <p>-----</p>

      <p>Liebe Teilnehmer,</p>

      <p>Sie haben sich erfolgreich für das Konzert des IREC Hamburg angemeldet: </p>
      <strong>Kühlender Klang vor dem Herbst</strong>
      <p>
        <strong>Datum: Samstag, 29. März 2025, 03:00 PM (CET)</strong>
        </br>
        <strong>Ort: Martin-Luther-Kirche - Martin-Luther-Gemeinde zu Hamburg-Alsterdorf, Bebelallee 156, 22297 Hamburg</strong>
      </p>

      <p>Für weitere Informationen können Sie eine E-Mail senden an:
      <a href="mailto:sekretaris.hamburg@gmx.de">sekretaris.hamburg@gmx.de
      </a>
      </p>

      <p>Wir sehen uns dort!</p>

      <p>Mit freundlichen Grüßen,
      <br/>
      IREC Hamburg</p>

      <p>P.S.: Dies ist eine automatisierte E-Mail. Bitte antworten Sie nicht auf diese E-Mail.</p>
  `,

      // attachment: [
      //   {
      //     url: "https://irec-concert-2024-bucket.s3.eu-central-1.amazonaws.com/concert-calender.ics",
      //   },
      // ],
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
