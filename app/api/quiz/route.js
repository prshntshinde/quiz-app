import connectMongoDB from "@/libs/mongodb"

export async function GET() {
    await connectMongoDB();
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    })
    const data = await res.json()
   
    return Response.json({ data })
  }