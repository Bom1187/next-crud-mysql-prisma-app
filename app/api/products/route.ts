import prisma from "@/lib/prisma";

// ฟังก์ชั้น API: POST (CREATE) เพิ่มข้อมูลลงตาราง products
export async function POST(request: Request) {
  // เอาข้อมูลที่ส่งมาจไปบันทึกลงใน table ซึ่งเป็น JSON เราจะเอามาใส่ตัวแปรเพื่อเอาไปใช้งาน
  const data = await request.json();

  // เอาข้อมูลที่อยู่ใน body มากำหนดให้กับ prisma เพื่อเอาไปบันทึกลง table
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
    },
  });
  //ส่งผลการทำงานหละบไปยัง client-user เป็น JSON ทั้งนี้สำหรับการเพิ่ม status เป็น 201
  return Response.json(product, { status: 201 });
}

// ฟังก์ชั้น API: GET (READ) ดึงข้อมูลจากตาราง products
export async function GET() {
  // ให้ prisma ดึงข้อมูลจาก table products มาใส่ตัวแปร products
  const products = await prisma.product.findMany();
  // ส่งผลการทำงานหละบไปยัง client-user เป็น JSON ทั้งนี้สำหรับการเพิ่ม status เป็น 200
  return Response.json(products, { status: 200 });
}
