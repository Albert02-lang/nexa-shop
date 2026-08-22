import { NextResponse } from "next/server";
import {
  createAdminSession,
  COOKIE_NAME,
} from "../../../lib/admin-auth";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const password =
      body?.password;

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

    if (
      password !==
      adminPassword
    ) {
      return NextResponse.json(
        {
          error:
            "Contraseña incorrecta.",
        },
        {
          status: 401,
        }
      );
    }

    const session =
      createAdminSession();

    const response =
      NextResponse.json({
        success: true,
      });

    response.cookies.set(
      COOKIE_NAME,
      session,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
        path: "/",
        maxAge:
          60 * 60 * 24,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Error en /api/admin-login:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Solicitud inválida.",
      },
      {
        status: 400,
      }
    );
  }
}