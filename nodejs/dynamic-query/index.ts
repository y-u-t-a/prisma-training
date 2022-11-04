import { PrismaClient } from '@prisma/client'
import { ActorSearchCondition, ActorSearchConditionBuilder } from './actor-search-condition'

async function main(input: ActorSearchCondition) {
  const prisma = new PrismaClient()
  const searchCondition = new ActorSearchConditionBuilder(input).build()
  const actors = await prisma.actor.findMany({
    where: {
      OR: searchCondition
    }
  })
  actors.forEach(actor => console.log(actor))
}

main({
  actorIdList: [1, 2, 3]
})