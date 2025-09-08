import { type NextRequest, NextResponse } from "next/server"

// Simulación de base de datos en memoria (en producción usar una DB real)
const persons = [
  { id: 1, nombre: "stiven", cargo: "fff", empleado: "fff", embeddings: 0, imageUrl: null },
  { id: 2, nombre: "stiven", cargo: "fff", empleado: "fff", embeddings: 0, imageUrl: null },
  { id: 3, nombre: "stiven", cargo: "gg", empleado: "01", embeddings: 0, imageUrl: null },
  { id: 4, nombre: "stiven", cargo: "gg", empleado: "01", embeddings: 0, imageUrl: null },
]

export async function GET() {
  return NextResponse.json({ persons })
}

export async function POST(request: NextRequest) {
  try {
    const { nombre, cargo, empleado } = await request.json()

    if (!nombre || !cargo || !empleado) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newPerson = {
      id: Math.max(...persons.map((p) => p.id)) + 1,
      nombre,
      cargo,
      empleado,
      embeddings: 0,
      imageUrl: null,
    }

    persons.push(newPerson)

    return NextResponse.json({ success: true, person: newPerson })
  } catch (error) {
    console.error("[v0] Error creating person:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, embeddings, imageUrl } = await request.json()

    const personIndex = persons.findIndex((p) => p.id === id)
    if (personIndex === -1) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 })
    }

    persons[personIndex] = {
      ...persons[personIndex],
      embeddings: embeddings || persons[personIndex].embeddings,
      imageUrl: imageUrl || persons[personIndex].imageUrl,
    }

    return NextResponse.json({ success: true, person: persons[personIndex] })
  } catch (error) {
    console.error("[v0] Error updating person:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
