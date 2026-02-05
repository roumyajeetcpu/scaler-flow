import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { Resend } from 'resend';
import { logger } from '@/lib/logger';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = contactSchema.parse(json);

        // If Resend API key is not set, just log and return success (for dev without key)
        if (!process.env.RESEND_API_KEY) {
            logger.info('Contact form submission (Mock):', body);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
            return NextResponse.json({ success: true });
        }

        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // Update with verified domain
            to: 'hello@scalerflow.com', // Update with actual email
            subject: `New message from ${body.name}`,
            text: `
        Name: ${body.name}
        Email: ${body.email}
        Company: ${body.company || 'N/A'}
        Message: ${body.message}
      `,
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
