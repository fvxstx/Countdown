import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const data = {
    to: `${body.email}`,
    from: "fvxstx@programmer.net",
    subject: "[Website Name] Contact Form - New Message",
    templateId: "d-d6246a69f8ef4ff6889f1699e71d1cf7",
  };

  sendgrid.send(data);

  return res.status(200).json({ status: "Ok" });
};
