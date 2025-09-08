import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File
    const personId = formData.get("personId") as string

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type. Please upload an image." }, { status: 400 })
    }

    // Convertir archivo a buffer para procesamiento
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Simular procesamiento de detección facial más realista
    // En producción, aquí usarías deepface o face-api.js
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simular análisis facial con mayor probabilidad de éxito
    const faceDetected = Math.random() > 0.1 // 90% de éxito

    if (!faceDetected) {
      return NextResponse.json(
        {
          error: "No face detected in the image. Please upload a clear photo with a visible face.",
        },
        { status: 400 },
      )
    }

    // Generar embeddings simulados (en producción serían embeddings reales)
    const embeddings = Array.from({ length: 128 }, () => Math.random() * 2 - 1)

    // Aquí guardarías en la base de datos real
    console.log(`[v0] Face detection successful for person ${personId}`)
    console.log(`[v0] Generated embeddings length: ${embeddings.length}`)

    return NextResponse.json({
      success: true,
      personId,
      embeddings: embeddings,
      confidence: 0.95,
      message: "Face detected and processed successfully",
    })
  } catch (error) {
    console.error("[v0] Face detection error:", error)
    return NextResponse.json(
      {
        error: "Internal server error during face detection",
      },
      { status: 500 },
    )
  }
}
