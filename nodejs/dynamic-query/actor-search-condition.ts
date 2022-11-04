import { Prisma } from '@prisma/client'

export interface ActorSearchCondition {
  firstName?: string
  actorIdList?: number[]
  lastUpdateFrom?: Date
  lastUpdateTo?: Date
}

export class ActorSearchConditionBuilder {
  private readonly firstName: string
  private readonly actorIdList: number[]
  private readonly lastUpdateFrom?: Date
  private readonly lastUpdateTo?: Date


  constructor(init: ActorSearchCondition) {
    this.firstName = init.firstName?.trim() || ""
    this.actorIdList = init.actorIdList || []
    this.lastUpdateFrom = init.lastUpdateFrom
    this.lastUpdateTo = init.lastUpdateTo
  }

  build(): Prisma.actorWhereInput[] {
    const conditions: Prisma.actorWhereInput[] = []

    if (this.firstName.length > 0) {
      conditions.push({
        first_name: { contains: this.firstName }
      })
    }

    if (this.actorIdList.length > 0) {
      conditions.push({
        actor_id: { in: this.actorIdList }
      })
    }

    if (this.lastUpdateFrom && this.lastUpdateTo) {
      conditions.push({
        AND: [
          {
            last_update: { gte: this.lastUpdateFrom }
          },
          {
            last_update: { lte: this.lastUpdateTo }
          }
        ]
      })
    } else if (this.lastUpdateFrom) {
      conditions.push({
        last_update: { gte: this.lastUpdateFrom }
      })
    } else if (this.lastUpdateTo) {
      conditions.push({
        last_update: { lte: this.lastUpdateTo }
      })
    }

    return conditions
  }
}