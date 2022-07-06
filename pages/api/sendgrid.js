import sendgrid from "@sendgrid/mail";

const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imphdnp4dHd0Z3poZXB1emNoeWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUyMzI2OTAsImV4cCI6MTk3MDgwODY5MH0.upiXI3HDWV4RRmAz4TxKLy09uR_y6diRi_QRci52n50";

sendgrid.setApiKey(NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);

  if (body.lastEmail == true) {
    const data = {
      to: `${body.email}`,
      from: "fvxstx@programmer.net",
      subject: "[Countdown] Final Contact",
      templateId: "d-1bb313b8ef3046bebf19a19da13db514",
    };

    sendgrid.send(data);
    return res.status(200).json({ status: "Ok" });
  } else if (body.lastEmail == false) {
    const data = {
      to: `${body.email}`,
      from: "fvxstx@programmer.net",
      subject: "[Countdown] Contact Form - New Message",
      templateId: "d-d6246a69f8ef4ff6889f1699e71d1cf7",
    };

    sendgrid.send(data);
    return res.status(200).json({ status: "Ok" });
  }
};
