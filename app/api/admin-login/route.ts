import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const password = body?.password;

    const adminPassword =
      process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        {
          error:
            "La contraseña de administrador no está configurada.",
        },
        {
          status: 500,
        }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        {
          error: "Contraseña incorrecta.",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Solicitud inválida.",
      },
      {
        status: 400,
      }
    );
  }
}