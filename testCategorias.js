import { getDB } from "./config/db.js";

async function test() {
  const db = getDB();
  const categorias = await db.collection("categorias").find().toArray();
  console.log("Categorías encontradas:", categorias);
  process.exit();
}

test().catch(err => {
  console.error("Error al conectar con DB:", err);
});
