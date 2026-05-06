import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return cabins;
}

export async function createCabin(newCabin) {
  // https://pxoanvfdfzshkrarxluf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  // create a cabin
  const imagePath =
    import.meta.env.VITE_SUPABASE_URL +
    "/storage/v1/object/public/cabin-images/" +
    imageName;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }

  // 2. Upload image (To bucket)

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
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }
  return data;
}
