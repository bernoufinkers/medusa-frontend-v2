import { listCategories } from "@lib/data/categories"
import { MegaMenu } from "../index"

export default async function MegaMenuWrapper() {
  const categories = await listCategories()

  return <MegaMenu categories={categories} />
}
