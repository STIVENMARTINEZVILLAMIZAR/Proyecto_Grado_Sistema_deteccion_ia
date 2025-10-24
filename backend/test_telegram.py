from alerts import enviar_alerta_telegram

# Enviar alerta de prueba
resultado = enviar_alerta_telegram(
    nombre_empresa="Mi Empresa Test",
    nombre_camara="Cámara Principal",
    similitud=0.45
)

if resultado:
    print("✅ ¡Alerta enviada correctamente a Telegram!")
else:
    print("❌ Error al enviar la alerta")