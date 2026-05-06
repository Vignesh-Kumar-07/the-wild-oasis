/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return cabins;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// https://pxoanvfdfzshkrarxluf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin?.image === "string" &&
    newCabin?.image?.startsWith(supabaseUrl);

  // console.log(hasImagePath, newCabin);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin?.image
    : supabaseUrl + "/storage/v1/object/public/cabin-images/" + imageName;

  // return;

  // create a cabin
  let query = supabase.from("cabins");
  // a) To create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b) To edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }

  // 2. Upload image (To bucket)
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // 3. Delete the cabin If there was an error uploading image.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cabin image could not be uploaded and the cabin was not created",
    );
  }
  return data;
}

export async function deleteCabin(id) {
  console.log(id, "api cabin")
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }
  return data;
}
