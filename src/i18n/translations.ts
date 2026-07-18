import { hasEnAlternate } from './ui'

export async function hasEnVersion(barePath: string): Promise<boolean> {
  return hasEnAlternate(barePath)
}
