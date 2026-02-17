import nodemailer from "nodemailer";

export const sendOrderEmail = async (order, user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Order Confirmation",
    html: `
      <h2>Thank you for your order!</h2>
      <p>Order ID: ${order._id}</p>
      <p>Total: ₹${order.totalPrice}</p>
      <p>Status: Paid</p>
    `,
  });
};
