import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = 'nodejs';

export async function POST(req: Request) {
    const { name, email, message } = await req.json();

    if(!name || !email || !message) {
        return NextResponse.json({error: "すべての項目を入力してください"}, { status: 400});
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: "お問い合わせフォームからのメッセージ",
        text: `名前: ${name}\nメール: ${email}\nメッセージ: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "送信に失敗しました"}, { status: 500 });
    }
    
}