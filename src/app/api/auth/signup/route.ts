import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

async function getPrisma() {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name, phone, adSource, adCampaignId, utmSource, utmMedium, utmCampaign } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const prisma = await getPrisma();
    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        phone: phone || null,
        adSource: adSource || null,
        adCampaignId: adCampaignId || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        firstVisitAt: new Date(),
        lastLoginAt: new Date(),
        loginCount: 1,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
