import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

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
  } else if (body.email == false) {
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
