import { NextResponse } from "next/server";
import { getSupabaseServer } from "../../../lib/supabase-server";

export async function GET() {
  try {
    const supabase = getSupabaseServer();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(
        "Error cargando productos:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      data ?? []
    );
  } catch (error) {
    console.error(
      "Error en GET /api/products:",
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

export async function POST(
  request: Request
) {
  try {
    const supabase =
      getSupabaseServer();

    const body =
      await request.json();

    const { data, error } =
      await supabase
        .from("products")
        .insert({
          name: body.name,
          price: body.price,
          image: body.image,
          category: body.category,
          type: body.type,
          gender: body.gender,
          description:
            body.description,
          size: body.size,
          sizes: body.sizes,
          colors: body.colors,
          available:
            body.available,
          status: body.status,
          tag: body.tag,
          stock: body.stock,
        })
        .select()
        .single();

    if (error) {
      console.error(
        "Error agregando producto:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      data,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Error en POST /api/products:",
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

export async function PUT(
  request: Request
) {
  try {
    const supabase =
      getSupabaseServer();

    const body =
      await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          error:
            "Falta el id del producto",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } =
      await supabase
        .from("products")
        .update({
          name: body.name,
          price: body.price,
          image: body.image,
          category: body.category,
          type: body.type,
          gender: body.gender,
          description:
            body.description,
          size: body.size,
          sizes: body.sizes,
          colors: body.colors,
          available:
            body.available,
          status: body.status,
          tag: body.tag,
          stock: body.stock,
        })
        .eq(
          "id",
          Number(body.id)
        )
        .select()
        .single();

    if (error) {
      console.error(
        "Error actualizando producto:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "Error en PUT /api/products:",
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

export async function PATCH(
  request: Request
) {
  try {
    const supabase =
      getSupabaseServer();

    const body =
      await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          error:
            "Falta el id del producto",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.status) {
      return NextResponse.json(
        {
          error:
            "Falta el estado del producto",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } =
      await supabase
        .from("products")
        .update({
          status: body.status,
          available:
            body.status !== "Vendido",
        })
        .eq(
          "id",
          Number(body.id)
        )
        .select()
        .single();

    if (error) {
      console.error(
        "Error actualizando estado:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "Error en PATCH /api/products:",
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

export async function DELETE(
  request: Request
) {
  try {
    const supabase =
      getSupabaseServer();

    const body =
      await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          error:
            "Falta el id del producto",
        },
        {
          status: 400,
        }
      );
    }

    const { error } =
      await supabase
        .from("products")
        .delete()
        .eq(
          "id",
          Number(body.id)
        );

    if (error) {
      console.error(
        "Error eliminando producto:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Error en DELETE /api/products:",
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