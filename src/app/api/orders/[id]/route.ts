import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

async function getPrisma() {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

// GET /api/orders/:id - Get specific order
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { id: orderId } = await params
    const prisma = await getPrisma();

    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
