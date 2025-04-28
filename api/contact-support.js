import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields (name, email, subject, message)' })
    }

    const msg = {
        to: process.env.CONTACT_FORM_EMAIL_TO,
        from: process.env.CONTACT_FORM_EMAIL_FROM,

        subject: `contact Form : ${subject} (from ${name})`,
        text: `
            Name: ${name}
            Email: ${email}
            subject: ${subject}
            message: ${message} 
        `,

        html: `
            <p><strong>Name:</strong>${name}</p>
            <p><strong>email:</strong><a href= "mailto:"${email}">${email}</a></p>
            <p><strong>subject:</strong>${subject}</p>
            <p><strong>message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        replyTo: email,
    };

    try {
        await sgMail.send(msg);

        res.status(200).json({ success: true, message: 'Message sent successfully! ' })
    } catch (error) {
        console.error('sendGrid Error :', error.response?.body || error)

        res.status(500).json({ success: false, error: 'Error sending message. Please Try again later.' })
    }
} 
