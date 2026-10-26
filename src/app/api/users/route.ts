import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"

async function getPrisma() {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

// GET /api/users - Get current user or all users (admin only)
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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        role: true,
        emailVerified: true,
        adSource: true,
        adCampaignId: true,
        utmSource: true,
        utmMedium: true,
        utmCampaign: true,
        firstVisitAt: true,
        dateOfBirth: true,
        gender: true,
        preferences: true,
        lastLoginAt: true,
        loginCount: true,
        createdAt: true,
        updatedAt: true,
        addresses: true,
        orders: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/users - Create new user (signup)
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

// PUT /api/users - Update user profile
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const { name, phone, dateOfBirth, gender, preferences } = body

    const prisma = await getPrisma();
    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,
        phone: phone || undefined,
        dateOfBirth: dateOfBirth || undefined,
        gender: gender || undefined,
        preferences: preferences || undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        dateOfBirth: true,
        gender: true,
        preferences: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
