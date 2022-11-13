import { test, expect } from 'vitest'
import { PrismaClient } from '@prisma/client'

import { ActorSearchConditionBuilder } from './actor-search-condition'

const prisma = new PrismaClient()

test('find by firstName', async () => {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.actor.create({
        data: {
          first_name: "test",
          last_name: "user",
        }
      })

      const conditions = new ActorSearchConditionBuilder({
        firstName: "test",
      }).build()
      const result = await tx.actor.findMany({
        where: {
          OR: conditions
        }
      })

      expect(result).toHaveLength(1)
      expect(result[0]).toMatchObject({
        first_name: "test",
        last_name: "user",
      })
      throw new Error() // rollback
    })
  } catch (error) { }
})