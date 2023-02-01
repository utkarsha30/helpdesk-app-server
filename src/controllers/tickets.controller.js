const TicketsService = require("../services/tickets.service");
const ClientService = require("../services/client.service");
const EmployeeService = require("../services/employees.service");
const { authorize } = require("../middleware/auth");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");

const { Errors } = require("../constants");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETE,
});
console.log(process.env.CLOUD_NAME);
console.log(process.env.API_KEY);
console.log(process.env.API_SECRETE);
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});
const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await TicketsService.getAllTickets();
    res.json(tickets);
  } catch (error) {
    next(error);
  }
};
const getAgentTicketCount = async (req, res, next) => {
  const { id } = req.params;
  try {
    const count = await TicketsService.getAgentTicketCount(id);
    res.json(count);
  } catch (error) {
    next(error);
  }
};
const getAdminTicketCount = async (req, res, next) => {
  try {
    const count = await TicketsService.getAdminTicketCount();
    res.json(count);
  } catch (error) {
    next(error);
  }
};
const getClientTicketsSummary = async (req, res, next) => {
  const { id } = req.params;
  try {
    const count = await TicketsService.getClientTicketsSummary(id);
    res.json(count);
  } catch (error) {
    next(error);
  }
};
const getTicketById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const match = await TicketsService.getTicketById(id);
    if (!match) {
      const error = new Error(`A client with ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.json(match);
  } catch (error) {
    next(error);
  }
};
// const postAttachments = async (req, res, next) => {
//   try {
//     console.log("called");
//     const { id } = req.params;
//     const file = req.files.attachments;
//     console.log("file check", file);
//     const result = await cloudinary.uploader.upload(
//       file.tempFilePath,
//       { folder: "attachments", public_id: file.name },
//       async (err, image) => {
//         console.log("check");
//         if (err) {
//           console.log(err);
//         }
//         console.log(image);
//       }
//     );
//     const updatedDetails = await TicketsService.postAttachments(id, {
//       attachments: result.secure_url,
//     });
//     res.status(201).json(updatedDetails);
//   } catch (error) {
//     next(error);
//   }
// };
// const postNewTicket = async (req, res, next) => {
//   if (Object.keys(req.body).length === 0) {
//     const error = new Error(
//       `Request body is missing, and needs to have for creating new ticket`
//     );
//     error.name = Errors.BadRequest;
//     return next(error);
//   }
//   try {
//     const newTicket = await TicketsService.postNewTicket(req.body);
//     res.status(201).json(newTicket);
//   } catch (error) {
//     next(error);
//   }
// };
const postNewTicket = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have details of ticket to be updated`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  const { title, description, category, client, attachments } = req.body;

  try {
    let ticketId = "";
    if (attachments === "null") {
      const newTicket = await TicketsService.postNewTicket({
        title,
        description,
        category,
        client,
      });
      ticketId = newTicket._id;

      res.json(newTicket);
    } else {
      const file = req.files.attachments;
      console.log("attachments", file);
      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: "attachments", public_id: file.name },
        async (err, image) => {
          console.log("check");
          if (err) {
            console.log(err);
          }
          console.log(image);
        }
      );
      const newTicket = await TicketsService.postNewTicket({
        title,
        description,
        category,
        client,
        attachments: result.secure_url,
      });
      ticketId = newTicket._id;

      res.json(newTicket);
    }
    const clientEmail = await ClientService.getClientEmailId(client);
    const email = clientEmail.email;
    const name = clientEmail.name;
    const admin = await EmployeeService.getAdminsEmailId();
    const adminEmail = admin.email;

    var mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      cc: adminEmail,
      subject: "New Ticket created",
      html: `
        <div>
        <h1 style="color:#472673">Helpdesk App </h1>
        <hr/>
        <p>Hello ${name},</p>
        <p>Thankyou for getting in touch with us<br>
        Your ticket no is : ${ticketId}</p>
        <p>  We will respond to your ticket by end of next business day (excluding weekends and public holidays); you are requested not to follow up until then.</p>
      
      <p>Regards,<br/>
        Helpdesk Team<br/>
        <img src="https://drive.google.com/uc?export=view&id=1lYCww2nru9EDySysQbKoMiWhfjbbSpcI" width="50" height="50" />
        </p>
        <span style="color:red;"><i> This email has been generated automatically. Please do not reply.</i></span>
        <div style="background-color: skyblue;font-family: Verdana,Geneva,sans-serif;margin-right: 40px;margin-left: 40px; padding:30px 10px 30px 10px">
        This message contains information that may be privileged or confidential and is the property of the Helpdesk App. Copyright © 2023 Utkarsha Kshirsagar. All rights reserved.
        <div>
        </div>
        `,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    next(error);
  }
};
const updateTicket = async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have details of ticket to be updated`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const updatedTicket = await TicketsService.updateTicket(id, req.body);
    const clientId = updatedTicket.client;
    const agentId = updatedTicket.agent;
    const clientInfo = await ClientService.getClientEmailId(clientId);
    const clientEmail = clientInfo.email;
    const clientName = clientInfo.name;

    if (agentId) {
      const agentInfo = await EmployeeService.getAgentEmailId(agentId);
      const agentEmail = agentInfo.email;

      if (updatedTicket.status === "closed") {
        console.log("inloop");
        var mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: clientEmail,
          cc: agentEmail,
          subject: `${updatedTicket._id} has been resolved`,
          html: `
          <div>
          <h1 style="color:#472673">Helpdesk App </h1>
          <hr/>
          <p>Hello ${clientName},</p>
          <p>We have resolved your issue.</p>
          <p>If you feel your ticket was not resolved correctly, you can reopen the ticket by clicking on the button below. Please do provide reason for reopening your ticket. Please note that if you have a different issue, then you must submit a new ticket</a></p>
          <button style="background-color:#0070ad;border:0;padding:10px;"> <a href="${process.env.WEBSITE_URL}client" style="text-decoration: none;color: white;" >View Case Status</a></button>
          <p>Incase the ticket remains closed for next 3 business days, the ticket will be considered resolved completely.</p>        
          <p>Regards,<br/>
          Helpdesk Team<br/>
          <img src="https://drive.google.com/uc?export=view&id=1lYCww2nru9EDySysQbKoMiWhfjbbSpcI" width="50" height="50" />
          </p>
          <span style="color:red;"><i> This email has been generated automatically. Please do not reply.</i></span>
          <div style="background-color: skyblue;font-family: Verdana,Geneva,sans-serif;margin-right: 40px;margin-left: 40px; padding:30px 10px 30px 10px">
          This message contains information that may be privileged or confidential and is the property of the Helpdesk App. Copyright © 2023 Utkarsha Kshirsagar. All rights reserved.
          <div>
          </div>
          `,
        };
      } else {
        var mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: clientEmail,
          cc: agentEmail,
          subject: `Update in ticket ${updatedTicket._id}`,
          html: `
          <div>
          <h1 style="color:#472673">Helpdesk App </h1>
          <hr/>
          <p>Hello ${clientName},</p>
          <p>There is an update in your ticket no : ${updatedTicket._id}</p>
          <p>Please check for details by login into <a href = "${process.env.WEBSITE_URL}">Helpdesk App</a></p>
        
        <p>Regards,<br/>
          Helpdesk Team<br/>
          <img src="https://drive.google.com/uc?export=view&id=1lYCww2nru9EDySysQbKoMiWhfjbbSpcI" width="50" height="50" />
          </p>
          <span style="color:red;"><i> This email has been generated automatically. Please do not reply.</i></span>
          <div style="background-color: skyblue;font-family: Verdana,Geneva,sans-serif;margin-right: 40px;margin-left: 40px; padding:30px 10px 30px 10px">
          This message contains information that may be privileged or confidential and is the property of the Helpdesk App. Copyright © 2023 Utkarsha Kshirsagar. All rights reserved.
          <div>
          </div>
          `,
        };
      }
    } else {
      if (updatedTicket.status === "closed") {
        var mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: clientEmail,
          cc: agentEmail,
          subject: `${updatedTicket._id} has been resolved`,
          html: `
          <div>
          <h1 style="color:#472673">Helpdesk App </h1>
          <hr/>
          <p>Hello ${clientName},</p>
          <p>We have resolved your issue.</p>
          <p>If you feel your ticket was not resolved correctly, you can reopen the ticket by clicking on the button below. Please do provide reason for reopening your ticket. Please note that if you have a different issue, then you must submit a new ticket</a></p>
          <button style="background-color:#0070ad;border:0;padding:10px;"> <a href="${process.env.WEBSITE_URL}client" style="text-decoration: none;color: white;" >View Case Status</a></button>
          <p>Incase the ticket remains closed for next 3 business days, the ticket will be considered resolved completely.</p>  
          <p>Regards,<br/>
          Helpdesk Team<br/>
          <img src="https://drive.google.com/uc?export=view&id=1lYCww2nru9EDySysQbKoMiWhfjbbSpcI" width="50" height="50" />
          </p>
          <span style="color:red;"><i> This email has been generated automatically. Please do not reply.</i></span>
          <div style="background-color: skyblue;font-family: Verdana,Geneva,sans-serif;margin-right: 40px;margin-left: 40px; padding:30px 10px 30px 10px">
          This message contains information that may be privileged or confidential and is the property of the Helpdesk App. Copyright © 2023 Utkarsha Kshirsagar. All rights reserved.
          <div>
          </div>
          `,
        };
      } else {
        var mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: clientEmail,
          subject: `Update in ticket ${updatedTicket._id}`,
          html: `
            <div>
            <h1 style="color:#472673">Helpdesk App </h1>
            <hr/>
            <p>Hello ${clientName},</p>
            <p>There is an update in your ticket no : ${updatedTicket._id}</p>
            <p>Please check for details by login into <a href = "${process.env.WEBSITE_URL}">Helpdesk App</a></p>
          
          <p>Regards,<br/>
            Helpdesk Team<br/>
            <img src="https://drive.google.com/uc?export=view&id=1lYCww2nru9EDySysQbKoMiWhfjbbSpcI" width="50" height="50" />
            </p>
            <span style="color:red;"><i> This email has been generated automatically. Please do not reply.</i></span>
            <div style="background-color: skyblue;font-family: Verdana,Geneva,sans-serif;margin-right: 40px;margin-left: 40px; padding:30px 10px 30px 10px">
            This message contains information that may be privileged or confidential and is the property of the Helpdesk App. Copyright © 2023 Utkarsha Kshirsagar. All rights reserved.
            <div>
            </div>
            `,
        };
      }
    }
    const info = await transporter.sendMail(mailOptions);
    if (updatedTicket === null) {
      const error = new Error(`A ticket with id = ${id} does not exist`);
      error.name = Errors.NotFound;

      return next(error);
    }
    res.json(updatedTicket);
  } catch (error) {
    next(error);
  }
};

const postComment = async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have details of comment to post it`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const postComment = await TicketsService.postComment(id, req.body);
    if (postComment === null) {
      const error = new Error(
        `A ticket with id = ${id} does not exist to post comment`
      );
      error.name = Errors.NotFound;

      return next(error);
    }
    const clientId = postComment.client;
    const agentId = postComment.agent;
    console.log(agentId);
    const clientInfo = await ClientService.getClientEmailId(clientId);
    const clientEmail = clientInfo.email;
    const clientName = clientInfo.name;

    if (agentId) {
      console.log("Insided agent Id");
      const agentInfo = await EmployeeService.getAgentEmailId(agentId);
      const agentEmail = agentInfo.email;
      console.log(agentEmail);
      var mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: clientEmail,
        cc: agentEmail,
        subject: `New Comment added for ticket ${postComment._id}`,
        html: `
        <div>
        <h1 style="color:#472673">Helpdesk App </h1>
        <hr/>
        <p>Hello ${clientName},</p>
        <p>There is a new comment added in your ticket no: ${postComment._id}</p>
        <p>Please check for details by login into <a href = "${process.env.WEBSITE_URL}">Helpdesk App</a></p>
      
      <p>Regards,<br/>
        Helpdesk Team<br/>
        <img src="https://drive.google.com/uc?export=view&id=1lYCww2nru9EDySysQbKoMiWhfjbbSpcI" width="50" height="50" />
        </p>
        <span style="color:red;"><i> This email has been generated automatically. Please do not reply.</i></span>
        <div style="background-color: skyblue;font-family: Verdana,Geneva,sans-serif;margin-right: 40px;margin-left: 40px; padding:30px 10px 30px 10px">
        This message contains information that may be privileged or confidential and is the property of the Helpdesk App. Copyright © 2023 Utkarsha Kshirsagar. All rights reserved.
        <div>
        </div>
        `,
      };
      const info = await transporter.sendMail(mailOptions);
    }
    res.json(postComment);
  } catch (error) {
    next(error);
  }
};
const deleteTicket = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTicket = await TicketsService.deleteTicket(id);
    if (deletedTicket === null) {
      const error = new Error(`A ticket with id = ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.json(deletedTicket);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  postNewTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  postComment,
  deleteTicket,
  getClientTicketsSummary,
  // postAttachments,
  getAdminTicketCount,
  getAgentTicketCount,
};
