import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    await resend.emails.send({
      from: 'REV. Pilates <hello@revpilates.com.au>',
      to: email,
      subject: "REV. Pilates — waitlist confirmation",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#FAF3EB;font-family:Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF3EB;padding:48px 24px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

                  <!-- Logo -->
                  <tr>
                    <td style="padding-bottom:8px;">
                      <span style="font-size:22px;font-weight:bold;color:#032EC9;letter-spacing:0.06em;font-style:italic;">REV.</span>
                      <span style="font-size:22px;color:rgba(3,46,201,0.45);letter-spacing:0.06em;font-style:italic;">PILATES</span>
                    </td>
                  </tr>

                  <!-- Pink divider -->
                  <tr>
                    <td style="padding-bottom:36px;">
                      <div style="width:40px;height:3px;background:#FF8CD1;"></div>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding-bottom:40px;">
                      <p style="margin:0 0 20px;font-size:15px;font-weight:300;line-height:1.75;color:#032EC9;">
                        Hi there,
                      </p>
                      <p style="margin:0 0 20px;font-size:26px;font-weight:700;color:#032EC9;letter-spacing:0.02em;line-height:1.2;">
                        You're in.
                      </p>
                      <p style="margin:0 0 20px;font-size:15px;font-weight:300;line-height:1.75;color:rgba(3,46,201,0.7);">
                        You've joined the REV. Pilates waitlist — your early access to our launch and upcoming founding member release.
                      </p>
                      <p style="margin:0 0 20px;font-size:15px;font-weight:300;line-height:1.75;color:rgba(3,46,201,0.7);">
                        When memberships go live, you'll be among the first invited to secure founding pricing. Availability will be limited and offered for a short time.
                      </p>
                      <p style="margin:0;font-size:15px;font-weight:300;line-height:1.75;color:rgba(3,46,201,0.7);">
                        We'll share more with you soon.
                      </p>
                    </td>
                  </tr>

                  <!-- ── SIGNATURE ────────────────────────────────── -->
                  <tr>
                    <td style="padding-top:8px;">
                      <table cellpadding="0" cellspacing="0" border="0" style="background:#FAF3EB;width:100%;">
                        <tr>
                          <!-- Pink left accent bar -->
                          <td width="4" style="background:#FF8CD1;width:4px;">&nbsp;</td>
                          <!-- Sig content -->
                          <td style="padding:20px 24px;">
                            <table cellpadding="0" cellspacing="0" border="0">

                              <!-- Name -->
                              <tr>
                                <td style="padding-bottom:3px;">
                                  <span style="font-size:15px;font-weight:700;color:#032EC9;letter-spacing:0.02em;">Amy</span>
                                </td>
                              </tr>
                              <!-- Title -->
                              <tr>
                                <td style="padding-bottom:14px;">
                                  <span style="font-size:10px;font-weight:400;color:rgba(3,46,201,0.55);letter-spacing:0.16em;text-transform:uppercase;">Founder &amp; Head Instructor</span>
                                </td>
                              </tr>
                              <!-- Divider -->
                              <tr>
                                <td style="padding-bottom:14px;">
                                  <div style="width:100%;height:1px;background:rgba(3,46,201,0.1);"></div>
                                </td>
                              </tr>
                              <!-- Logo -->
                              <tr>
                                <td style="padding-bottom:14px;">
                                  <span style="font-size:17px;font-weight:700;color:#032EC9;letter-spacing:0.06em;font-style:italic;">REV.</span>
                                  <span style="font-size:17px;font-weight:400;color:rgba(3,46,201,0.45);letter-spacing:0.06em;font-style:italic;">PILATES</span>
                                </td>
                              </tr>
                              <!-- Email -->
                              <tr>
                                <td style="padding-bottom:5px;">
                                  <a href="mailto:hello@revpilates.com.au" style="font-size:12px;font-weight:300;color:#032EC9;text-decoration:none;letter-spacing:0.03em;">hello@revpilates.com.au</a>
                                </td>
                              </tr>
                              <!-- Instagram -->
                              <tr>
                                <td style="padding-bottom:5px;">
                                  <a href="https://instagram.com/revpilates_" style="font-size:12px;font-weight:300;color:#032EC9;text-decoration:none;letter-spacing:0.03em;">@revpilates_</a>
                                </td>
                              </tr>
                              <!-- Website -->
                              <tr>
                                <td>
                                  <a href="https://revpilates.com.au" style="font-size:12px;font-weight:300;color:#032EC9;text-decoration:none;letter-spacing:0.03em;">revpilates.com.au</a>
                                </td>
                              </tr>

                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer fine print -->
                  <tr>
                    <td style="padding-top:32px;">
                      <p style="margin:0;font-size:11px;font-weight:300;color:rgba(3,46,201,0.3);line-height:1.6;">
                        You're receiving this because you signed up at revpilates.com.au.<br/>
                        No spam. Just the good stuff.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}