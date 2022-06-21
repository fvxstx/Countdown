import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);

  if (body.lastEmail == true) {
    const data = {
      to: `${body.email}`,
      from: "fvxstx@programmer.net",
      subject: "[Website Name] Contact Form - New Message",
      text: `${body.email} Boa boa entrou no ultimo email`,
      html: "<br>Boa boa entrou porra</br>",
    };
    sendgrid.send(data);
    return res.status(200).json({ status: "Ok" });
  } else {
    const data = {
      to: `${body.email}`,
      from: "fvxstx@programmer.net",
      subject: "[Website Name] Contact Form - New Message",
      templateId: "d-d6246a69f8ef4ff6889f1699e71d1cf7",
    };

    sendgrid.send(data);
    return res.status(200).json({ status: "Ok" });
  }
};
