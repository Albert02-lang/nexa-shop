import { NextResponse } from "next/server";
import { getSupabaseServer } from "../../../lib/supabase-server";

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error:
            "No se recibió ninguna imagen",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      getSupabaseServer();

    const fileName =
      `${Date.now()}-${file.name}`;

    const arrayBuffer =
      await file.arrayBuffer();

    const { error } =
      await supabase.storage
        .from("products")
        .upload(
          fileName,
          arrayBuffer,
          {
            contentType:
              file.type ||
              "application/octet-stream",

            upsert: false,
          }
        );

    if (error) {
      console.error(
        "Error subiendo imagen:",
        error
      );

      return NextResponse.json(
        {
          error:
            error.message,
        },
        {
          status: 500,
        }
      );
    }

    const {
      data,
    } =
      supabase.storage
        .from("products")
        .getPublicUrl(
          fileName
        );

    return NextResponse.json({
      url:
        data.publicUrl,
    });
  } catch (error) {
    console.error(
      "Error en /api/upload-image:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error desconocido",
      },
      {
        status: 500,
      }
    );
  }
}