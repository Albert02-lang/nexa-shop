import { NextResponse } from "next/server";
import { getSupabaseServer } from "../../../lib/supabase-server";
import {
  COOKIE_NAME,
  isAdminSessionValid,
} from "../../../lib/admin-auth";

// =====================================================
// COMPROBAR AUTENTICACIÓN DEL ADMINISTRADOR
// =====================================================

async function requireAdmin() {
  const { cookies } = await import("next/headers");

  const cookieStore = await cookies();

  const session =
    cookieStore.get(COOKIE_NAME)?.value;

  return isAdminSessionValid(session);
}

// =====================================================
// GET — OBTENER TODOS LOS PRODUCTOS
// =====================================================

export async function GET() {
  try {
    const supabase = getSupabaseServer();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", {
        ascending: false,
      });

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

    return NextResponse.json(data ?? []);
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

// =====================================================
// POST — CREAR PRODUCTO
// =====================================================

export async function POST(
  request: Request
) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      {
        error: "No autorizado.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const supabase = getSupabaseServer();

    const body = await request.json();

    const { data, error } = await supabase
      .from("products")
      .insert({
        name: body.name,
        price: body.price,
        image: body.image,
        category: body.category,
        type: body.type,
        gender: body.gender,
        description: body.description,
        size: body.size,
        colors: body.colors,
        available: body.available,
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

    return NextResponse.json(data, {
      status: 201,
    });
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

// =====================================================
// PUT — EDITAR PRODUCTO
// =====================================================

export async function PUT(
  request: Request
) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      {
        error: "No autorizado.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const supabase = getSupabaseServer();

    const body = await request.json();

    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        {
          error:
            "ID de producto no válido",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .update({
        name: body.name,
        price: body.price,
        image: body.image,
        category: body.category,
        type: body.type,
        gender: body.gender,
        description: body.description,
        size: body.size,
        colors: body.colors,
        available: body.available,
        status: body.status,
        tag: body.tag,
        stock: body.stock,
      })
      .eq("id", id)
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

// =====================================================
// PATCH — CAMBIAR ESTADO DEL PRODUCTO
// =====================================================

export async function PATCH(
  request: Request
) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      {
        error: "No autorizado.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const supabase = getSupabaseServer();

    const body = await request.json();

    const id = Number(body.id);

    const status = body.status;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "ID de producto no válido",
        },
        {
          status: 400,
        }
      );
    }

    if (
      status !== "Disponible" &&
      status !== "En trato" &&
      status !== "Vendido"
    ) {
      return NextResponse.json(
        {
          error:
            "Estado de producto no válido",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .update({
        status,
        available:
          status !== "Vendido",
      })
      .eq("id", id)
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

// =====================================================
// DELETE — ELIMINAR PRODUCTO
// =====================================================

export async function DELETE(
  request: Request
) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      {
        error: "No autorizado.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const supabase = getSupabaseServer();

    const body = await request.json();

    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        {
          error:
            "ID de producto no válido",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

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