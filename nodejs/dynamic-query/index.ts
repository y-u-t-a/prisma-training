import { PrismaClient } from '@prisma/client'
import { ActorSearchCondition, ActorSearchConditionBuilder } from './actor-search-condition'

export async function searchActor(input: ActorSearchCondition) {
  const prisma = new PrismaClient()
  const searchCondition = new ActorSearchConditionBuilder(input).build()
  const actors = await prisma.actor.findMany({
    where: {
      OR: searchCondition
    }
  })
  actors.forEach(actor => console.log(actor))
}
