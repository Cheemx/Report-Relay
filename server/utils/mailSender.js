import nodemailer from "nodemailer"


const sendEmailWithAttachment = async (to, subject, text, attachmentPath) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        const mail = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            text,
            attachments:[{
                filename: 'report.pdf',
                path:`${attachmentPath}`
            }]
        }) 
    } catch (error) {
        throw error
    }
}

export {sendEmailWithAttachment}