import app from '../server/app'
import { PrismaClient } from '@prisma/client'

// Create a single PrismaClient instance
const prisma = new PrismaClient()

// Handle connection cleanup
const handleRequest = async (request: Request) => {
  try {
    return await app.fetch(request)
  } finally {
    await prisma.$disconnect()
  }
}

export default {
  fetch: handleRequest
}