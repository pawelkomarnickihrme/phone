import { createClient } from "@/utils/supabase/client";

export async function getPhone(id: string) {
  getAllPhones();
  const supabase = createClient();
  let { data: products, error } = await supabase
    .from("products")
    .select("*")

    // Filters
    .eq("id", id);

  if (error) throw error;
  return products;
}
export async function getAllPhones() {
  const supabase = createClient();

  let { data: products, error } = await supabase.from("products").select("*");
  console.log(products, error);
}
