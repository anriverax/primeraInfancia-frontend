import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {getServerSession} from "next-auth";
import {authOptions} from "@/features/auth/service/nextAuth";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function POST(req: Request) {

    const session = await getServerSession(authOptions);
    if(session === null){
        return NextResponse.json(
            { message: "No session" },
            { status: 401 }
        );
    }
    if(session.user === null){
        return NextResponse.json(
            { message: "No user" },
            { status: 401 }
        );
    }
    console.log(' access token ', session?.accessToken);
    console.log(' access token ', session.user?.email);

    if (!session || !session.user.email || !session.accessToken) {
        return NextResponse.json(
            { message: "No autorizado o sesión expirada" },
            { status: 401 }
        );
    }
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const mapping = JSON.parse(formData.get("mapping") as string);
    const userEmail = session.user.email;
    const token = session.accessToken ? session.accessToken.toString() : '';
    if (!file) {
        return NextResponse.json({ message: "Archivo no proporcionado" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = `grades/${Date.now()}_${file.name}`;
    const bucket = process.env.AWS_S3_BUCKET!;

    try {
        await s3.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: fileName,
                Body: buffer,
            })
        );

        const s3Uri = `s3://${bucket}/${fileName}`;
        console.log(s3Uri);
        console.log('url ', `${process.env.NEXT_PUBLIC_BACKEND}/grade/upload`);
        console.log('body ', {
            fileName: file.name,
            s3Uri,
            mapping,
            userEmail,
        });

        const nestResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/grade/upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
                filename: file.name,
                s3uri: s3Uri,
                mapping,
                userEmail,
            }),
        });
        console.log('nest response ', nestResponse);
        if (!nestResponse.ok)
            throw new Error("Error al registrar el archivo en NestJS");

        const decodedResponse:{
            data:{
                id: number
            }
        } = await nestResponse.json();
        console.log('decoded repsonse ', decodedResponse);
        const processResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/grade/process-upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ uploadId: decodedResponse.data.id }),
        });
        console.log('grades response ', processResponse );
        const result = await processResponse.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error al subir o procesar el archivo" }, { status: 500 });
    }
}
