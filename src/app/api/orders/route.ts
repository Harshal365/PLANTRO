import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

async function getPrisma() {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

// GET /api/orders - Get user's orders
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const prisma = await getPrisma();

    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: true,
              },
            },
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/orders - Create new order
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()

    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      discount,
      total,
      notes,
      campaignId,
      adPlatform,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body

    const prisma = await getPrisma();
    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const orderNumber = `PLT${Date.now().toString().slice(-8)}`

    let shippingAddrId = shippingAddress.id
    if (!shippingAddrId) {
      const newAddress = await prisma.address.create({
        data: {
          userId,
          fullName: shippingAddress.fullName,
          phone: shippingAddress.phone,
          addressLine1: shippingAddress.addressLine1,
          addressLine2: shippingAddress.addressLine2,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country || "India",
          isDefault: false,
        },
      })
      shippingAddrId = newAddress.id
    }

    let billingAddrId = billingAddress.id
    if (!billingAddrId) {
      const newAddress = await prisma.address.create({
        data: {
          userId,
          fullName: billingAddress.fullName,
          phone: billingAddress.phone,
          addressLine1: billingAddress.addressLine1,
          addressLine2: billingAddress.addressLine2,
          city: billingAddress.city,
          state: billingAddress.state,
          postalCode: billingAddress.postalCode,
          country: billingAddress.country || "India",
          isDefault: false,
        },
      })
      billingAddrId = newAddress.id
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        shippingAddressId: shippingAddrId,
        billingAddressId: billingAddrId,
        subtotal,
        shipping,
        tax,
        discount,
        total,
        paymentMethod,
        notes,
        campaignId,
        adPlatform,
        utmSource,
        utmMedium,
        utmCampaign,
        conversionValue: total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
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

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
