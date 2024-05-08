import fs from "fs";
import path from "path";
import { createClient } from "@/utils/supabase/server";

async function loadData() {
  "use server";
  const filePath = path.join(process.cwd(), "data.json");

  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  let error = null;
  const supabase = createClient();
  for (const item of jsonData) {
    if (!item.id) return;
    const { data, error: insertError } = await supabase
      .from("products")
      .upsert([
        {
          id: item.id,
          ean: item.ean,
          sourceproductid: item.sourceProductId,
          name: item.name,
          feedid: item.offers.feedId,
          producturl: item.offers.productUrl,
          pricevalue: parseFloat(item.offers.priceHistory[0].price.value), // Konwersja ciągu do wartości zmiennoprzecinkowej
          pricecurrency: item.offers.priceHistory[0].price.currency,
          pricedate: item.offers.priceHistory[0].date,
          modified: item.offers.modified,
          programlogo: item.offers.programLogo,
          programname: item.offers.programName,
          availability: item.offers.availability,
          productimageurl: item.productImage.url, // Zamiana obiektu na ciąg znaków JSON
          normalvariantram: item.normalize.normalVariant.ram?.ram_val || 0,
          normalvariantramunit:
            item.normalize.normalVariant?.ram?.ram_unit || "",
          normalvariantstorage:
            item.normalize.normalVariant.storage?.storage_val || 0,
          normalvariantstorageunit:
            item.normalize.normalVariant.storage?.storage_unit || "",
          namenormalize: item.normalize.normalName?.name_normalize || "",
          namelower: item.normalize.normalName?.name_lower || "",
        },
      ])

      .select();
    console.log(data);
    if (insertError) {
      console.error(`Error inserting item with id ${item.id}:`, insertError);
      error = insertError;
      break; // Przerwij pętlę po pierwszym napotkanym błędzie
    }
  }

  // Sprawdź, czy wystąpił błąd
  if (!error) {
    console.log("All items have been successfully inserted.");
  }
}

// Wywołaj funkcję loadData
export default loadData;
