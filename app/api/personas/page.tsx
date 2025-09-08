"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Upload, Plus, AlertCircle } from "lucide-react"

interface Person {
  id: number
  nombre: string
  cargo: string
  empleado: string
  embeddings: number
  imageFile?: File
  imageUrl?: string
}

export default function PersonasPage() {
  const [persons, setPersons] = useState<Person[]>([])
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [processingId, setProcessingId] = useState<number | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPerson, setNewPerson] = useState({
    nombre: "",
    cargo: "",
    empleado: "",
  })

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = async () => {
    try {
      const response = await fetch("/api/persons")
      const data = await response.json()
      setPersons(data.persons)
    } catch (error) {
      console.error("[v0] Error fetching persons:", error)
    }
  }

  const handleFileUpload = async (personId: number, file: File) => {
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Por favor selecciona un archivo de imagen válido")
      setShowErrorModal(true)
      return
    }

    setProcessingId(personId)

    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("personId", personId.toString())

      const response = await fetch("/api/face-detection", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        setErrorMessage(result.error || "Error procesando la imagen")
        setShowErrorModal(true)
        return
      }

      await fetch("/api/persons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: personId,
          embeddings: 1,
          imageUrl: URL.createObjectURL(file),
        }),
      })

      setPersons((prev) =>
        prev.map((person) => (person.id === personId ? { ...person, embeddings: 1, imageFile: file } : person)),
      )

      console.log("[v0] Face detection successful:", result)
    } catch (error) {
      console.error("[v0] Error processing face detection:", error)
      setErrorMessage("Error de conexión al procesar la imagen")
      setShowErrorModal(true)
    } finally {
      setProcessingId(null)
    }
  }

  const handleAddPerson = async () => {
    if (!newPerson.nombre || !newPerson.cargo || !newPerson.empleado) {
      setErrorMessage("Por favor completa todos los campos")
      setShowErrorModal(true)
      return
    }

    try {
      const response = await fetch("/api/persons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPerson),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrorMessage(result.error || "Error al agregar persona")
        setShowErrorModal(true)
        return
      }

      setPersons((prev) => [...prev, result.person])
      setNewPerson({ nombre: "", cargo: "", empleado: "" })
      setShowAddModal(false)
    } catch (error) {
      console.error("[v0] Error adding person:", error)
      setErrorMessage("Error de conexión al agregar persona")
      setShowErrorModal(true)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Personas</h1>
            <p className="text-gray-600 mt-2">Registra y gestiona las personas para detección facial</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Upload, Plus, AlertCircle } from "lucide-react"

interface Person {
  id: number
  nombre: string
  cargo: string
  empleado: string
  embeddings: number
  imageFile?: File
  imageUrl?: string
}

export default function PersonasPage() {
  const [persons, setPersons] = useState<Person[]>([])
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [processingId, setProcessingId] = useState<number | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPerson, setNewPerson] = useState({
    nombre: "",
    cargo: "",
    empleado: "",
  })

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/people")
      const data = await response.json()
      setPersons(data.people || [])
    } catch (error) {
      console.error("[v0] Error fetching persons:", error)
      setErrorMessage("Error de conexión con el servidor Flask")
      setShowErrorModal(true)
    }
  }

  const handleFileUpload = async (personId: number, file: File) => {
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Por favor selecciona un archivo de imagen válido")
      setShowErrorModal(true)
      return
    }

    setProcessingId(personId)

    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("person_id", personId.toString())

      const response = await fetch("http://127.0.0.1:5000/api/face_recognition", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        setErrorMessage(result.error || "Error procesando la imagen")
        setShowErrorModal(true)
        return
      }

      await fetch(`http://127.0.0.1:5000/api/people/${personId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeddings: result.embeddings || 1,
        }),
      })

      setPersons((prev) =>
        prev.map((person) => (person.id === personId ? { ...person, embeddings: 1, imageFile: file } : person)),
      )

      console.log("[v0] Face detection successful:", result)
    } catch (error) {
      console.error("[v0] Error processing face detection:", error)
      setErrorMessage("Error de conexión al procesar la imagen con DeepFace")
      setShowErrorModal(true)
    } finally {
      setProcessingId(null)
    }
  }

  const handleAddPerson = async () => {
    if (!newPerson.nombre || !newPerson.cargo || !newPerson.empleado) {
      setErrorMessage("Por favor completa todos los campos")
      setShowErrorModal(true)
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: newPerson.nombre,
          cargo: newPerson.cargo,
          empleado: newPerson.empleado,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrorMessage(result.error || "Error al agregar persona")
        setShowErrorModal(true)
        return
      }

      setPersons((prev) => [...prev, result.person])
      setNewPerson({ nombre: "", cargo: "", empleado: "" })
      setShowAddModal(false)
    } catch (error) {
      console.error("[v0] Error adding person:", error)
      setErrorMessage("Error de conexión al agregar persona")
      setShowErrorModal(true)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Personas</h1>
            <p className="text-gray-600 mt-2">Registra y gestiona las personas para detección facial</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Persona
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personas Registradas</CardTitle>
            <CardDescription>Lista de personas en el sistema de detección facial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-50 to-cyan-50">
                    <TableHead className="font-semibold text-blue-900">ID</TableHead>
                    <TableHead className="font-semibold text-blue-900">Nombre</TableHead>
                    <TableHead className="font-semibold text-blue-900">Cargo</TableHead>
                    <TableHead className="font-semibold text-blue-900">Empleado</TableHead>
                    <TableHead className="font-semibold text-blue-900">Embeddings</TableHead>
                    <TableHead className="font-semibold text-blue-900">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {persons.map((person) => (
                    <TableRow key={person.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">{person.id}</TableCell>
                      <TableCell>{person.nombre}</TableCell>
                      <TableCell>{person.cargo}</TableCell>
                      <TableCell>{person.empleado}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            person.embeddings > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {person.embeddings}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                handleFileUpload(person.id, file)
                              }
                            }}
                            disabled={processingId === person.id}
                            className="hidden"
                            id={`file-${person.id}`}
                          />
                          <Label
                            htmlFor={`file-${person.id}`}
                            className={`cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                              processingId === person.id
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gray-600 text-white hover:bg-gray-700"
                            }`}
                          >
                            {processingId === person.id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Procesando...
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4 mr-2" />
                                Seleccionar archivo
                              </>
                            )}
                          </Label>
                          {person.imageFile && <span className="text-xs text-green-600">{person.imageFile.name}</span>}
                          {!person.imageFile && person.embeddings === 0 && (
                            <span className="text-xs text-gray-500">Sin archivos seleccionados</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span>127.0.0.1:5000 dice</span>
              </DialogTitle>
              <DialogDescription className="text-red-600 font-medium">{errorMessage}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowErrorModal(false)} className="bg-teal-500 hover:bg-teal-600 text-white">
                Aceptar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Persona</DialogTitle>
              <DialogDescription>Ingresa los datos de la nueva persona para el sistema de detección</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={newPerson.nombre}
                  onChange={(e) => setNewPerson({ ...newPerson, nombre: e.target.value })}
                  placeholder="Ingresa el nombre"
                />
              </div>
              <div>
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  value={newPerson.cargo}
                  onChange={(e) => setNewPerson({ ...newPerson, cargo: e.target.value })}
                  placeholder="Ingresa el cargo"
                />
              </div>
              <div>
                <Label htmlFor="empleado">Empleado</Label>
                <Input
                  id="empleado"
                  value={newPerson.empleado}
                  onChange={(e) => setNewPerson({ ...newPerson, empleado: e.target.value })}
                  placeholder="Código de empleado"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddPerson} className="bg-blue-600 hover:bg-blue-700">
                Agregar Persona
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
